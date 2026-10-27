# Phase 0 Implementation Plan: Blueprint, Tooling & SDD Foundation

> **Phase Owner:** Monish (Technical Lead)  
> **Status:** APPROVED

---

## 1. Architecture & Module Ownership

- **Owner**: Monish
- **Scope**: Repository-wide tooling, root configs, `src/core/`, `src/commands/`, `src/utils/`, `.specify/`, `specs/`, `docs/`, `tests/`, `scripts/`.
- Future phase placeholder modules: `src/scanner/`, `src/parser/`, `src/graph/`, `src/storage/`, `src/analysis/`, `src/passport/`, `src/ui/`.

## 2. File Modification & Creation Inventory

- Root config: `package.json`, `tsconfig.json`, `tsconfig.test.json`, `eslint.config.js`, `.prettierrc.json`, `.prettierignore`, `.gitignore`, `.gitattributes`, `.npmrc`, `esbuild.config.mjs`, `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, `CHANGELOG.md`.
- Tooling scripts: `scripts/check-environment.mjs`, `scripts/verify-project.mjs`, `.specify/scripts/validate-sdd.mjs`.
- Specs: `specs/architecture.md`, `specs/constitution.md`, and `phase-0` to `phase-4` specifications.
- Source files: `src/extension.ts`, `src/commands/showPassport.ts`, `src/core/types.ts`, `src/core/orchestrator.ts`, `src/utils/logger.ts`, and module type contracts.
- Tests: `tests/unit/core.test.ts`, `tests/unit/utils.test.ts`, `tests/integration/extension.test.ts`, `tests/helpers/testUtils.ts`, `tests/fixtures/sample-repo`.

## 3. Interfaces & Data Contracts

Codified in `src/core/types.ts`:

- `IProgressReporter`
- `ICancellationToken`
- `ScannedFile`, `FileInventory`
- `SymbolRecord`, `SourceLocation`
- `GraphNode`, `GraphEdge`
- `AnalysisFinding`
- `ProjectPassportData`

## 4. Dependency Decisions

- Only Phase 0 devDependencies are installed (`typescript`, `@types/node`, `@types/vscode`, `vitest`, `esbuild`, `eslint`, `prettier`, etc.).
- Heavy native modules (`better-sqlite3`, `tree-sitter`) are intentionally deferred until Phase 1 and Phase 2.

## 5. Implementation Sequence

1. Directory hierarchy and configuration files.
2. SDD constitution, templates, and validation script.
3. Core contracts (`src/core/types.ts`) and future module type stubs.
4. Runnable extension entry points and command handlers.
5. Unit and integration tests.
6. Validation scripts (`check-environment.mjs`, `verify-project.mjs`).
7. Comprehensive documentation suite.
8. Dependency installation (`npm install`) and full verification execution (`npm run verify`).

## 6. Testing Strategy

- Unit tests run with Vitest to verify core orchestration logic, cancellation, and logging.
- Integration tests verify extension activation and command execution.
- SDD validator ensures structural completeness.
