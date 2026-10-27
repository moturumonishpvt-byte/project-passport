# Phase 1 Specification: Repository Scanner & Local SQLite Index

> **Phase Owner:** Ashif  
> **Status:** SPECIFICATION READY (Awaiting Phase 0 Handover)  
> **Target Release:** 0.1.0-prototype-p1

---

## 1. Problem Statement

To provide codebase intelligence, Project Passport must discover, inventory, and track all source code files in a repository. Because code changes frequently during AI-assisted development, re-scanning the entire repository from scratch on every change is too slow. Phase 1 delivers a fast, incremental workspace scanner and a local persistent SQLite index that fingerprints files using SHA-256 hashes.

## 2. Goals & Success Metrics

- **Primary Goal**: Deliver a high-performance local scanner and SQLite indexing service that can inventory a 10,000-file repository in < 2 seconds and incrementally update changed files in < 100 milliseconds.
- **Key Metrics**:
  - Full scan and hash of standard repositories within performance targets.
  - Correct exclusion of ignored patterns (`.gitignore`, `node_modules`, binary files).
  - Robust SQLite persistence with ACID transactions and schema migration support.
  - Zero external network requests; zero AI credit consumption.

## 3. In-Scope Requirements

- **`REQ-P1-001`**: Implement repository file discovery honoring `.gitignore` and default ignore sets (`node_modules`, `.git`, `dist`, `out`, binary formats).
- **`REQ-P1-002`**: Compute SHA-256 content hashes for candidate source files (`.ts`, `.js`, `.py`, etc.).
- **`REQ-P1-003`**: Initialize local SQLite database schema for files, content hashes, sizes, and timestamps.
- **`REQ-P1-004`**: Implement incremental change detection (added, modified, deleted, unchanged files).
- **`REQ-P1-005`**: Provide SQLite repository layer implementing `IFileRepository` defined in `src/storage/types.ts`.
- **`REQ-P1-006`**: Support workspace file-system watcher integration to trigger incremental re-indexing on file save/delete.
- **`REQ-P1-007`**: Implement cancellation token support for long-running initial scans.

## 4. Explicit Out-of-Scope Items

- `OUT-P1-001`: Abstract Syntax Tree (AST) parsing or symbol extraction (handled in Phase 2).
- `OUT-P1-002`: Call graph or dependency edge resolution (handled in Phase 2).
- `OUT-P1-003`: Webview visualization of scanned files (handled in Phase 3).
- `OUT-P1-004`: Outbound telemetry or cloud synchronization.

## 5. Non-Functional Requirements

- **Memory Footprint**: < 100MB RAM during 10,000-file inventory.
- **Database Footprint**: SQLite database file created locally under `.passport/` or workspace storage; strictly excluded from Git.
- **Database Binding**: Use a compatible SQLite binding (such as `better-sqlite3` or official `@vscode/sqlite3`) verified for the target OS and VS Code environment.

## 6. Interfaces & Dependencies

- Implements: `src/scanner/types.ts` (`IScannerService`, `FileInventory`, `ScannedFile`).
- Implements: `src/storage/types.ts` (`IStorageService`, `IFileRepository`).
- Consumes: `src/core/types.ts` (`ICancellationToken`, `IProgressReporter`).

## 7. Failure Handling & Edge Cases

- Unreadable or permission-denied files: Log warning and continue scanning remaining files.
- Locked SQLite database: Implement retry with exponential backoff and timeout.
- Abrupt cancellation: Rollback open SQLite transactions cleanly.

## 8. Acceptance Criteria

- [ ] `AC-P1-001`: Scanner inventories `tests/fixtures/sample-repo` accurately and returns correct file count.
- [ ] `AC-P1-002`: Files in `.gitignore` are excluded from the scanned inventory.
- [ ] `AC-P1-003`: Modifying a single file updates only that file's record in SQLite.
- [ ] `AC-P1-004`: Deleting a file purges its entry from the SQLite database.
- [ ] `AC-P1-005`: SQLite database file is confirmed inside `.gitignore` and not tracked by Git.
- [ ] `AC-P1-006`: Zero network connections established during scanning and indexing.

## 9. Risks & Open Questions

- **Risk**: Compiling native C++ SQLite bindings across Windows, macOS, and Linux in extension environments.  
  _Mitigation_: Evaluate WASM-based SQLite (e.g. `sql.js` or official VS Code SQLite binding) as a zero-compilation fallback if native bindings cause host friction.
