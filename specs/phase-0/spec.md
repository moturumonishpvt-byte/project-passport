# Phase 0 Specification: Blueprint, Tooling, Core Contracts & SDD Foundation

> **Phase Owner:** Monish (Technical Lead)  
> **Status:** APPROVED & IN VERIFICATION  
> **Target Release:** 0.1.0-prototype-p0

---

## 1. Problem Statement

Before Ashif, Nitish, and Darshan can write production features in sequential order, the repository must have a cohesive blueprint. Without upfront architecture, strict interfaces, reproducible tooling, and an enforceable Spec-Driven Development (SDD) process, multi-developer projects quickly succumb to broken import paths, directory duplication, divergent coding styles, and scope creep.

## 2. Goals & Success Metrics

- **Primary Goal**: Deliver a fully structured, compiling, lint-free, testable prototype repository with stable module boundaries and runnable baseline commands.
- **Key Metrics**:
  - 100% of planned architectural directories and placeholder modules created upfront.
  - TypeScript build, ESLint, Prettier, and Vitest passing out of the box.
  - Runnable VS Code extension baseline registered with two non-destructive commands.
  - Zero network dependencies, zero credentials, zero unverified claims.

## 3. In-Scope Requirements

- **`REQ-P0-001`**: Establish complete directory structure and root configuration files (`package.json`, `tsconfig.json`, `eslint.config.js`, `.prettierrc.json`, `.gitignore`).
- **`REQ-P0-002`**: Codify the canonical project constitution (`.specify/memory/constitution.md`) and create SDD templates and validation scripts.
- **`REQ-P0-003`**: Define core data contracts and module boundaries (`src/core/types.ts`) for all future phases.
- **`REQ-P0-004`**: Scaffold future-phase module entry points (`scanner`, `parser`, `graph`, `storage`, `analysis`, `passport`, `ui`, `utils`) with typed interfaces without fake or premature implementations.
- **`REQ-P0-005`**: Implement a minimal, runnable VS Code starter extension with safe workspace inspection (`project-passport.showPassport` and `project-passport.scanWorkspace`).
- **`REQ-P0-006`**: Create comprehensive automated test suite (unit, integration, and fixtures) using Vitest.
- **`REQ-P0-007`**: Produce developer onboarding documentation (`docs/PHASE_0_README.md`, `ARCHITECTURE.md`, `DEVELOPMENT.md`, `TESTING.md`, `PRIVACY.md`, `HANDOVER.md`, `KNOWN_LIMITATIONS.md`, ADRs).

## 4. Explicit Out-of-Scope Items

- `OUT-P0-001`: Implementing SQLite database schema or queries (assigned to Phase 1 — Ashif).
- `OUT-P0-002`: Tree-sitter AST parsing or call graph generation (assigned to Phase 2 — Nitish).
- `OUT-P0-003`: Webview panel GUI or interactive graph canvas (assigned to Phase 3 — Darshan).
- `OUT-P0-004`: Static analysis architectural rules (assigned to Phase 4 — Monish).
- `OUT-P0-005`: Any network calls, cloud synchronization, AI prompt generation, or telemetry.

## 5. Non-Functional Requirements

- **Runtime**: Node.js LTS (>= 20.0.0), npm (>= 10.0.0).
- **IDE Target**: VS Code Extension API (^1.90.0) with Antigravity compatibility investigated.
- **Compilation**: Fast bundling via `esbuild` (< 1 second) and strict TypeScript checking.
- **Zero-Egress Security**: Strict local execution; no remote network calls.

## 6. Interfaces & Dependencies

- Shared contracts: `src/core/types.ts`.
- Extension commands: `src/commands/showPassport.ts`.
- Phase 0 Dependencies: `typescript`, `@types/node`, `@types/vscode`, `vitest`, `esbuild`, `eslint`, `prettier`.

## 7. Failure Handling & Edge Cases

- When opened with no workspace folder active, extension gracefully shows warning notification instead of throwing uncaught exceptions.
- Graceful handling of non-existent files during sample scans.

## 8. Acceptance Criteria

- [ ] `AC-P0-001`: Repository structure matches master prompt blueprint exactly.
- [ ] `AC-P0-002`: `npm run compile` completes with 0 errors.
- [ ] `AC-P0-003`: `npm run lint` and `npm run format:check` complete with 0 errors.
- [ ] `AC-P0-004`: `npm run test` executes Vitest suite and passes all tests.
- [ ] `AC-P0-005`: `npm run validate:sdd` validates all SDD phase specifications and templates.
- [ ] `AC-P0-006`: `npm run check-env` validates the local developer environment.
- [ ] `AC-P0-007`: `npm run verify` runs all checks end-to-end with zero exit code.
- [ ] `AC-P0-008`: Extension bundles into `dist/extension.js` via `npm run build`.

## 9. Risks & Open Questions

- **Risk**: Node native binding compatibility for future Tree-sitter and SQLite modules on Windows vs macOS vs Linux.  
  _Mitigation_: Phase 0 defines purely typed abstraction interfaces so future native bindings are isolated behind storage and parser contracts.
