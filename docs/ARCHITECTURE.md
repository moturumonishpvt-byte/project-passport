# Project Passport — System Architecture & Data Flow

> **Version:** 0.1.0-prototype  
> **Status:** APPROVED BASELINE  
> **Author:** Monish (Technical Lead)

---

## 1. Architectural Philosophy

Project Passport is built on four core tenets:

1. **Deterministic Static Analysis**: Prefer reliable AST queries and graph algorithms over probabilistic AI guesses.
2. **Local-First Isolation**: Data stays on disk locally in SQLite; zero outbound telemetry or code uploads.
3. **Sub-second Incremental Updates**: Hash-based cache invalidation prevents re-parsing untouched files.
4. **Decoupled Engine Core**: Analysis logic is separated from IDE view bindings.

---

## 2. End-to-End Data Pipeline

```
 [File System]
       │
       ▼
 ┌──────────────┐      Fingerprint (SHA-256)
 │   Scanner    │ ───────────────────────────────────────────┐
 └──────┬───────┘                                           │
        │                                                   ▼
        ▼ (dirty files)                              ┌──────────────┐
 ┌──────────────┐                                    │   Storage    │
 │    Parser    │ ───► Extract Symbols ────────────► │   (SQLite)   │
 └──────┬───────┘                                    │              │
        │                                            │  - files     │
        ▼                                            │  - symbols   │
 ┌──────────────┐                                    │  - edges     │
 │    Graph     │ ───► Resolve Imports & Calls ────► │  - findings  │
 └──────┬───────┘                                    └──────┬───────┘
        │                                                   │
        ▼                                                   │
 ┌──────────────┐                                           │
 │   Analysis   │ ───► Detect Cycles & Dead Code ───────────┤
 └──────┬───────┘                                           │
        │                                                   │
        ▼                                                   ▼
 ┌──────────────┐                                    ┌──────────────┐
 │   Passport   │ ◄───────────────────────────────── │ UI (Webview) │
 └──────────────┘                                    └──────────────┘
```

---

## 3. Module Boundaries & Interfaces

| Module       | Directory       | Primary Output Contract                   | Ownership |
| :----------- | :-------------- | :---------------------------------------- | :-------- |
| **Core**     | `src/core/`     | `CoreOrchestrator`, `ProjectPassportData` | Monish    |
| **Scanner**  | `src/scanner/`  | `FileInventory`, `ScannedFile`            | Ashif     |
| **Storage**  | `src/storage/`  | `IStorageService`, `IFileRepository`      | Ashif     |
| **Parser**   | `src/parser/`   | `ParseResult`, `SymbolRecord`             | Nitish    |
| **Graph**    | `src/graph/`    | `DependencyGraph`, `GraphEdge`            | Nitish    |
| **UI**       | `src/ui/`       | `PassportPanel`, `WebviewMessage`         | Darshan   |
| **Passport** | `src/passport/` | `IPassportService`                        | Darshan   |
| **Analysis** | `src/analysis/` | `AnalysisFinding[]`                       | Monish    |
| **Utils**    | `src/utils/`    | `Logger`, safe filesystem utilities       | Shared    |

---

## 4. Invalidation & Cache Strategy

1. Scanner computes `sha256(fileContent)`.
2. Compares hash against SQLite `files.content_hash`.
3. If unchanged: Skip Tree-sitter parse entirely.
4. If changed:
   - Purge old symbols for this file in `symbols`.
   - Purge outgoing edges in `graph_edges`.
   - Parse AST and re-insert new symbols and call sites.
   - Re-resolve affected upstream callers.
