# Phase 2 Task Breakdown: Tree-sitter Parser & Relationship Engine

> **Phase Owner:** Nitish  
> **Status:** PENDING (Waiting for Phase 1 Handover)

---

## Ordered Task List

| Task ID      | Description                                                | Predecessor      | Assignee | Expected Files                                | Required Tests                           | Definition of Done                                                  |
| :----------- | :--------------------------------------------------------- | :--------------- | :------- | :-------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------ |
| `TSK-P2-001` | Install Tree-sitter grammars and verify runtime parsing    | Phase 1 Handover | Nitish   | `package.json`, `package-lock.json`           | Tree-sitter smoke test                   | TypeScript and Python grammars load without errors                  |
| `TSK-P2-002` | Implement AST query visitors for function/class extraction | `TSK-P2-001`     | Nitish   | `src/parser/index.ts`                         | Unit tests (`tests/unit/parser.test.ts`) | Extracts functions, classes, and methods with accurate line numbers |
| `TSK-P2-003` | Implement import and export extraction                     | `TSK-P2-002`     | Nitish   | `src/parser/imports.ts`                       | Unit tests                               | Accurately extracts `import ... from '...'` specifiers              |
| `TSK-P2-004` | Implement import resolution & file-symbol linker           | `TSK-P2-003`     | Nitish   | `src/graph/index.ts`, `src/graph/resolver.ts` | Unit tests (`tests/unit/graph.test.ts`)  | Resolves relative imports to workspace symbol IDs                   |
| `TSK-P2-005` | Implement function call extractor & edge builder           | `TSK-P2-004`     | Nitish   | `src/graph/calls.ts`                          | Integration tests                        | Builds `calls` edges between caller and callee symbols              |
| `TSK-P2-006` | Implement explicit unresolved reference tracking           | `TSK-P2-005`     | Nitish   | `src/graph/index.ts`                          | Graph tests                              | External and unresolvable symbols tagged `status: 'unresolved'`     |
| `TSK-P2-007` | Connect parser/graph outputs to SQLite repositories        | `TSK-P2-006`     | Nitish   | `src/storage/index.ts`                        | Storage tests                            | Symbols and edges persisted and queried cleanly                     |
| `TSK-P2-008` | Execute verification suite and complete Phase 2 acceptance | `TSK-P2-007`     | Nitish   | `specs/phase-2/acceptance.md`                 | `npm run verify`                         | All acceptance criteria executed with evidence recorded             |
