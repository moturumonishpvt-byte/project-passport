# Phase 1 Implementation Plan: Repository Scanner & Local SQLite Index

> **Phase Owner:** Ashif  
> **Status:** READY FOR IMPLEMENTATION (Following Phase 0 Handover)

---

## 1. Architecture & Module Ownership

- **Owner**: Ashif
- **Target Modules**: `src/scanner/`, `src/storage/`
- **Assisting / Review**: Monish (Tech Lead)

## 2. File Modification & Creation Inventory

- Files to modify:
  - `src/scanner/index.ts`: Implement `ScannerService`.
  - `src/storage/index.ts`: Implement `SqliteStorageService` and `FileRepository`.
  - `tests/unit/scanner.test.ts`: Scanner unit tests.
  - `tests/unit/storage.test.ts`: Storage unit tests.
  - `specs/phase-1/acceptance.md`: Record verification results.

## 3. Interfaces & Data Contracts

- Implement `IScannerService` and `FileInventory` from `src/scanner/types.ts`.
- Implement `IStorageService` and `IFileRepository` from `src/storage/types.ts`.
- Database Table Schema:
  ```sql
  CREATE TABLE IF NOT EXISTS files (
    path TEXT PRIMARY KEY,
    content_hash TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    language_id TEXT NOT NULL,
    last_indexed_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_files_hash ON files(content_hash);
  ```

## 4. Dependency Decisions

- Install selected SQLite binding (e.g. `@vscode/sqlite3` or `better-sqlite3`) as defined in architecture review.
- Add fast glob / ignore matcher (e.g. `picomatch` or `ignore`).

## 5. Implementation Sequence

1. Implement ignore filter and filesystem discovery in `src/scanner/`.
2. Implement SHA-256 stream hashing for discovered files.
3. Implement SQLite schema initialization and CRUD methods in `src/storage/`.
4. Connect scanner and storage for incremental indexing logic.
5. Add VS Code workspace watcher events.
6. Verify unit and integration tests against synthetic fixtures.

## 6. Testing Strategy

- Unit test file discovery and ignore matching using `tests/fixtures/sample-repo`.
- Unit test SQLite transactional persistence, concurrency, and dirty-file invalidation.
- Security test: Verify zero outbound sockets during scan.
