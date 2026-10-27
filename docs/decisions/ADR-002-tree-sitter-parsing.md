# ADR-002: Tree-sitter for Deterministic AST Parsing

## Status

Accepted

## Context

Phase 2 requires accurate symbol extraction from TypeScript, JavaScript, and Python files. Regular expressions and heuristic string matching are fragile and fail on nested constructs. TypeScript's compiler API is powerful but heavy and TypeScript-only.

## Decision

Use **Tree-sitter** (via `web-tree-sitter` WASM bindings) as the primary AST parsing engine for all supported languages. The WASM variant avoids native compilation (`node-gyp`) issues across operating systems.

## Consequences

- **Positive**: Battle-tested grammars for all target languages; error-recovery handles incomplete AI-generated code; consistent parsing across Windows, macOS, Linux.
- **Negative**: WASM initialization has a ~100ms cold-start cost on first parse session. Mitigation: warm up parser on extension activation.
