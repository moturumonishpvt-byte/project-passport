# Project Passport — System Architecture & Module Contracts

> **Version:** 0.1.0-prototype  
> **Status:** Approved Baseline  
> **Author:** Monish (Technical Lead)

---

## 1. High-Level Architectural Vision

Project Passport delivers deterministic, local codebase intelligence specifically tailored for AI-generated codebases. When code is generated rapidly by AI coding agents, developers often lose a mental model of the system's structural integrity, call hierarchies, and architectural drift. Project Passport provides that structural intelligence without incurring additional AI subscription or token credit costs.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VS Code / IDE Interface                         │
│  ┌───────────────────────┐              ┌───────────────────────────┐  │
│  │   Command Handlers    │              │  Webview Panel (Passport) │  │
│  │    (src/commands/)    │              │       (src/ui/)           │  │
│  └───────────┬───────────┘              └─────────────▲─────────────┘  │
│              │                                        │                │
│              ▼                                        │                │
│  ┌────────────────────────────────────────────────────┴─────────────┐  │
│  │                     Core Orchestrator Engine                     │  │
│  │                           (src/core/)                            │  │
│  └───────┬──────────────┬──────────────┬──────────────┬─────────────┘  │
└──────────┼──────────────┼──────────────┼──────────────┼────────────────┘
           │              │              │              │
           ▼              ▼              ▼              ▼
┌────────────────┐┌──────────────┐┌─────────────┐┌──────────────┐
│    Scanner     ││    Parser    ││    Graph    ││   Analysis   │
│ (src/scanner/) ││(src/parser/) ││(src/graph/) ││(src/analysis)│
└────────┬───────┘└───────┬──────┘└──────┬──────┘└──────┬───────┘
         │                │              │              │
         └────────────────┴───────┬──────┴──────────────┘
                                  ▼
                    ┌──────────────────────────┐
                    │      Storage Module      │
                    │      (src/storage/)      │
                    │   SQLite & Cache Layer   │
                    └──────────────────────────┘
```

---

## 2. Module Responsibilities & Boundary Invariants

### 1. `src/core/` (Orchestrator)

- **Responsibility**: Coordinates indexing pipelines, handles cancellation tokens, aggregates status events, and exposes clean APIs to IDE commands.
- **Contract**: Decoupled from VS Code UI widgets; relies only on generic interfaces (`IProgressReporter`, `ICancellationToken`).

### 2. `src/scanner/` (Phase 1 — Ashif)

- **Responsibility**: Discovers workspace files, ignores excluded paths (`.gitignore`, `node_modules`, binary files), computes content SHA-256 hashes, and detects added/modified/deleted files.
- **Contract**: Emits `FileInventory` and `FileChangeEvent` batches.

### 3. `src/parser/` (Phase 2 — Nitish)

- **Responsibility**: Parses supported languages (TypeScript, JavaScript, Python) via Tree-sitter into syntax trees and extracts symbols (functions, classes, interfaces, methods, imports, exports).
- **Contract**: Takes `SourceFile` and produces `SymbolRecord[]` with precise 1-indexed line and column ranges.

### 4. `src/graph/` (Phase 2 — Nitish)

- **Responsibility**: Computes dependency graphs, import resolution, and call hierarchy edges between extracted symbols.
- **Contract**: Maintains nodes (`GraphNode`) and directional edges (`GraphEdge`), identifying unresolved symbols explicitly.

### 5. `src/storage/` (Phase 1 — Ashif)

- **Responsibility**: Manages persistent SQLite database storage for file metadata, symbol records, dependency edges, and analysis caches.
- **Contract**: Provides repository interfaces (`IFileRepository`, `ISymbolRepository`, `IGraphRepository`).

### 6. `src/analysis/` (Phase 4 — Monish)

- **Responsibility**: Runs rule-based static analysis to detect architectural findings (e.g., circular dependencies, orphan components, dead entrypoints, god functions).
- **Contract**: Evaluates `Graph` and emits `AnalysisFinding[]` with severity, rule ID, and evidence references.

### 7. `src/passport/` (Phase 3 — Darshan)

- **Responsibility**: Aggregates architecture metrics, project summary, symbol counts, and health scores into a unified "Passport Document".
- **Contract**: Produces `ProjectPassportData` for display by UI renderers.

### 8. `src/ui/` (Phase 3 — Darshan)

- **Responsibility**: Webview panel rendering, interactive graph navigation, search filtering, and editor source-code jumping.
- **Contract**: Communicates via strongly-typed messages between webview and extension host.

### 9. `src/utils/` (Cross-cutting)

- **Responsibility**: Safe filesystem path normalization, logging, hashing, and error formatting.

---

## 3. Data Contracts & Type Definitions

The canonical TypeScript contracts representing these boundaries are codified in:
`src/core/types.ts`

Key interfaces include:

- `WorkspaceSnapshot`: Overall repository metadata, file count, and last indexed timestamp.
- `ScannedFile`: Path, hash, byte size, language identifier, and indexed status.
- `SymbolRecord`: Kind (`function`, `class`, `method`, `variable`), name, scope, and `SourceLocation`.
- `GraphNode` & `GraphEdge`: Source symbol ID, target symbol ID, edge type (`imports`, `calls`, `extends`), and resolution status (`resolved` vs `unresolved`).
- `AnalysisFinding`: ID, rule ID, message, severity (`info`, `warning`, `critical`), and affected files.
- `ProjectPassportData`: The consolidated intelligence payload.

---

## 4. Content Hashing & Incremental Invalidation Strategy

To provide sub-second incremental indexing without re-parsing untouched files:

1. **Discovery**: The scanner enumerates candidate files.
2. **Fingerprinting**: For each file, compute `sha256(content)`.
3. **Cache Lookup**: Query SQLite `files` table for `filePath` and stored `content_hash`.
4. **Invalidation**:
   - If hash is identical: retain existing symbols and edges; skip Tree-sitter parsing.
   - If hash differs: mark file as dirty, purge stale symbols and outbound edges, re-parse via Tree-sitter, and update SQLite transactionally.
   - If file deleted: delete entry and cascade edge deletions.

---

## 5. Privacy & Zero-Egress Invariant

Every module is architected with strict local isolation:

- No `fetch`, `axios`, `http`, or `https` outbound calls in production bundles.
- No dynamic `eval` or remote script execution.
- Testing suites include network isolation verifications to assert that no outbound sockets are opened.
