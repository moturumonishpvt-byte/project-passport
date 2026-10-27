# Phase 2 Implementation Plan: Tree-sitter Parser & Relationship Engine

> **Phase Owner:** Nitish  
> **Status:** READY FOR IMPLEMENTATION (Following Phase 1 Handover)

---

## 1. Architecture & Module Ownership

- **Owner**: Nitish
- **Target Modules**: `src/parser/`, `src/graph/`
- **Assisting / Review**: Monish (Tech Lead)

## 2. File Modification & Creation Inventory

- Files to modify:
  - `src/parser/index.ts`: Implement `ParserService`.
  - `src/graph/index.ts`: Implement `GraphService` and relationship resolution algorithms.
  - `src/storage/schema.ts`: Add `symbols` and `graph_edges` tables.
  - `tests/unit/parser.test.ts`: Parser symbol extraction unit tests.
  - `tests/unit/graph.test.ts`: Graph edge resolution tests.
  - `specs/phase-2/acceptance.md`: Record verification results.

## 3. Interfaces & Data Contracts

- Implement `IParserService` and `SymbolRecord` from `src/parser/types.ts`.
- Implement `IGraphService`, `GraphNode`, `GraphEdge` from `src/graph/types.ts`.
- Database Table Schema Extensions:
  ```sql
  CREATE TABLE IF NOT EXISTS symbols (
    id TEXT PRIMARY KEY,
    file_path TEXT NOT NULL,
    name TEXT NOT NULL,
    kind TEXT NOT NULL,
    start_line INTEGER NOT NULL,
    start_column INTEGER NOT NULL,
    end_line INTEGER NOT NULL,
    end_column INTEGER NOT NULL,
    parent_id TEXT,
    FOREIGN KEY(file_path) REFERENCES files(path) ON DELETE CASCADE
  );
  CREATE TABLE IF NOT EXISTS graph_edges (
    id TEXT PRIMARY KEY,
    source_symbol_id TEXT NOT NULL,
    target_symbol_id TEXT,
    target_name TEXT NOT NULL,
    edge_type TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY(source_symbol_id) REFERENCES symbols(id) ON DELETE CASCADE
  );
  ```

## 4. Dependency Decisions

- Install `web-tree-sitter` (or native `tree-sitter`) and grammar wasm/bindings for `typescript`, `javascript`, and `python`.

## 5. Implementation Sequence

1. Set up Tree-sitter AST queries for TypeScript/JavaScript functions and classes.
2. Implement symbol extraction in `src/parser/`.
3. Implement relative path and module import resolution in `src/graph/`.
4. Implement call-site expression matcher to build call graph edges.
5. Implement unresolved reference tagging for external/unresolved identifiers.
6. Persist extracted symbols and edges to SQLite repositories.

## 6. Testing Strategy

- Unit test parser against TypeScript, JavaScript, and Python fixture samples.
- Validate call graph resolution on known call chains in `tests/fixtures/sample-repo`.
- Assert explicit reporting of unresolved symbols.
