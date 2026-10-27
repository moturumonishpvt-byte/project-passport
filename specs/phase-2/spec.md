# Phase 2 Specification: Tree-sitter Parser & Relationship Engine

> **Phase Owner:** Nitish  
> **Status:** SPECIFICATION READY (Awaiting Phase 1 Handover)  
> **Target Release:** 0.1.0-prototype-p2

---

## 1. Problem Statement

Raw file inventories and line counts are insufficient for understanding AI-generated code. Developers need to know what functions, classes, and interfaces exist, where they are defined, what they import, and who calls whom. Phase 2 introduces syntax parsing via Tree-sitter and builds a deterministic dependency and call relationship graph, explicitly tracking resolved and unresolved symbols.

## 2. Goals & Success Metrics

- **Primary Goal**: Extract functions, methods, classes, and call/import relationships for TypeScript, JavaScript, and Python files with 100% deterministic accuracy.
- **Key Metrics**:
  - Extract symbols with precise 1-indexed line and column ranges.
  - Resolve internal imports and function calls within the project graph.
  - Transparently tag unresolved external imports or dynamic calls as `unresolved`.
  - Parse files at > 1,000 lines/second without freezing the IDE main thread.

## 3. In-Scope Requirements

- **`REQ-P2-001`**: Integrate Tree-sitter grammars for TypeScript/JavaScript (`tree-sitter-typescript`, `tree-sitter-javascript`) and Python (`tree-sitter-python`).
- **`REQ-P2-002`**: Extract symbols: functions, methods, classes, interfaces, types, imports, and exports into `SymbolRecord` entities.
- **`REQ-P2-003`**: Implement import resolution engine to link import specifiers (e.g. `import { foo } from './bar'`) to target file paths and symbols.
- **`REQ-P2-004`**: Build call-graph extractor linking caller functions to callee functions (`calls` edges).
- **`REQ-P2-005`**: Distinguish resolved graph edges from unresolved or dynamic calls (`status: 'resolved' | 'unresolved'`).
- **`REQ-P2-006`**: Store extracted symbols and graph edges into SQLite repository (`ISymbolRepository`, `IGraphRepository`).
- **`REQ-P2-007`**: Incremental graph invalidation: re-parse only modified files and update affected graph edges.

## 4. Explicit Out-of-Scope Items

- `OUT-P2-001`: Complex type inference across third-party `node_modules` typings (focus is on workspace source).
- `OUT-P2-002`: Dynamic runtime evaluation or JavaScript `eval()` inspection.
- `OUT-P2-003`: Webview interactive canvas rendering (handled in Phase 3 — Darshan).
- `OUT-P2-004`: Architectural anti-pattern analysis rules (handled in Phase 4 — Monish).

## 5. Non-Functional Requirements

- **Determinism**: Identical source code must always produce identical symbol IDs and graph edges.
- **Robustness**: Syntax errors in incomplete AI-generated files must not crash the parser; Tree-sitter error-recovery nodes must be handled gracefully.

## 6. Interfaces & Dependencies

- Implements: `src/parser/types.ts` (`IParserService`, `SymbolRecord`, `SourceLocation`).
- Implements: `src/graph/types.ts` (`IGraphService`, `GraphNode`, `GraphEdge`, `DependencyGraph`).
- Consumes: `src/scanner/types.ts` (`ScannedFile`) and `src/storage/types.ts` (`ISymbolRepository`, `IGraphRepository`).

## 7. Failure Handling & Edge Cases

- Syntax errors / broken code: Record partial symbol extractions and flag parsing diagnostics.
- Circular imports: Handled without infinite recursion in graph traversal.
- Missing imported module: Recorded as unresolved graph node without failing.

## 8. Acceptance Criteria

- [ ] `AC-P2-001`: Tree-sitter parses TypeScript and Python files from `tests/fixtures/sample-repo`.
- [ ] `AC-P2-002`: Functions, classes, and methods are extracted with accurate start/end lines.
- [ ] `AC-P2-003`: Relative import statements correctly map to corresponding workspace file symbols.
- [ ] `AC-P2-004`: Function call edges (`calls`) are constructed between functions within the repository.
- [ ] `AC-P2-005`: Unresolvable calls or external packages are explicitly recorded with `status: 'unresolved'`.
- [ ] `AC-P2-006`: Incremental modification of one file updates its symbols without re-parsing untouched files.

## 9. Risks & Open Questions

- **Risk**: Native compilation of `tree-sitter` native bindings on target user operating systems.  
  _Mitigation_: Use WebAssembly-based Tree-sitter (`web-tree-sitter`) if native node-gyp builds encounter host compilation hurdles.
