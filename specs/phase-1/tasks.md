# Phase 1 Task Breakdown: Repository Scanner & Local SQLite Index

> **Phase Owner:** Ashif  
> **Status:** PENDING (Waiting for Phase 0 Handover)

---

## Ordered Task List

| Task ID      | Description                                                | Predecessor                | Assignee | Expected Files                                  | Required Tests                            | Definition of Done                                                |
| :----------- | :--------------------------------------------------------- | :------------------------- | :------- | :---------------------------------------------- | :---------------------------------------- | :---------------------------------------------------------------- |
| `TSK-P1-001` | Install and verify SQLite binding & file matcher           | Phase 0 Handover           | Ashif    | `package.json`, `package-lock.json`             | `check-environment.mjs`                   | Dependency builds cleanly without native errors                   |
| `TSK-P1-002` | Implement workspace filesystem scanner & ignore filter     | `TSK-P1-001`               | Ashif    | `src/scanner/index.ts`                          | Unit tests (`tests/unit/scanner.test.ts`) | Discovers source files while ignoring `.gitignore` patterns       |
| `TSK-P1-003` | Implement SHA-256 content hashing pipeline                 | `TSK-P1-002`               | Ashif    | `src/scanner/hasher.ts`                         | Unit tests                                | Deterministic hashes produced for text and binary files           |
| `TSK-P1-004` | Implement SQLite database initializer & migrations         | `TSK-P1-001`               | Ashif    | `src/storage/index.ts`, `src/storage/schema.ts` | Unit tests (`tests/unit/storage.test.ts`) | Database initializes `files` table; manages connection pool       |
| `TSK-P1-005` | Implement incremental change detection & file sync         | `TSK-P1-003`, `TSK-P1-004` | Ashif    | `src/scanner/index.ts`                          | Integration tests                         | Detects added, modified, deleted files; updates SQLite index      |
| `TSK-P1-006` | Hook file-system watcher to extension workspace events     | `TSK-P1-005`               | Ashif    | `src/extension.ts`                              | Extension tests                           | Saving or deleting a file in workspace triggers incremental index |
| `TSK-P1-007` | Execute verification suite and complete Phase 1 acceptance | `TSK-P1-006`               | Ashif    | `specs/phase-1/acceptance.md`                   | `npm run verify`                          | All acceptance criteria executed with results recorded            |
