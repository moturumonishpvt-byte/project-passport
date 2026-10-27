# Project Passport — Canonical Engineering Constitution

> **Status:** Canonical & Active  
> **Location:** `.specify/memory/constitution.md`  
> **Reference Link:** All phase specifications must align with and adhere to this constitution.

---

## 1. Project Purpose & Guiding Mission

**Project Passport** provides credit-independent, deterministic codebase intelligence for modern applications, particularly AI-generated codebases. It operates inside the developer's IDE as a trusted local companion without consuming the developer's precious AI coding-agent credits.

---

## 2. Fundamental Invariants (Non-Negotiable)

1. **Local-First, Zero-Exfiltration Privacy**:
   - Source code, file system metadata, AST tokens, relationship graphs, and analysis findings must **never** leave the local development machine.
   - The extension must never perform telemetry, advertising, analytics, remote syncing, or unauthorized network calls.
   - Local network tests must verify zero outbound traffic during index, parse, and presentation cycles.

2. **Zero AI Credit Consumption**:
   - The core intelligence engine relies strictly on deterministic static analysis, Tree-sitter grammars, graph traversal, and SQLite query indexing.
   - The extension must **never** invoke LLM inference endpoints, private coding-agent background hooks, or external AI services during normal operation.

3. **Stable Module Boundaries**:
   - The architecture is divided into eight discrete modules: `core`, `scanner`, `parser`, `graph`, `storage`, `analysis`, `passport`, and `ui`.
   - No phase owner may arbitrarily create new root directories or alter inter-module contracts without an approved specification change.

4. **Transient & Local Storage**:
   - All persistence is managed in local SQLite database files (e.g., in `.passport/` or workspace storage).
   - Database files, journals, logs, and lockfiles are strictly `.gitignore`d and must never be committed to source control.

5. **Honest Engineering & Verification**:
   - No test, build, or acceptance check may be reported as passing unless it was actually executed with recorded evidence.
   - Limitations, unresolved dependencies, and partial parsing coverage must be reported transparently to the user.

---

## 3. Team Responsibilities & Ownership

| Phase       | Module / Focus                                                      | Phase Owner |
| :---------- | :------------------------------------------------------------------ | :---------- |
| **Phase 0** | Blueprint, Tooling, Core Contracts, SDD Foundation, Verification    | **Monish**  |
| **Phase 1** | Repository Discovery, Filtering, Incremental Scanner, SQLite Index  | **Ashif**   |
| **Phase 2** | Tree-sitter Language Parsers, Symbol Extraction, Relationship Graph | **Nitish**  |
| **Phase 3** | VS Code Webview Interface, Navigation, Project Passport UI          | **Darshan** |
| **Phase 4** | Static Analysis Findings, Architecture Health, Final Acceptance     | **Monish**  |

---

## 4. The Spec-Driven Development (SDD) Lifecycle

Every phase must strictly progress through the following eight stages:

1. **Specify (`spec.md`)**: Define problem, scope, functional requirements with stable IDs (e.g. `REQ-P1-001`), out-of-scope boundaries, non-functional constraints, and acceptance criteria.
2. **Plan (`plan.md`)**: Detail architectural design, module ownership, data models, file changes, dependency additions, and test strategies.
3. **Task Breakdown (`tasks.md`)**: Define ordered, discrete tasks with assigned owners, dependencies, and explicit definitions of done.
4. **Approve**: Technical lead (Monish) reviews and approves `spec.md`, `plan.md`, and `tasks.md`. Implementation cannot proceed prior to approval.
5. **Implement**: Code is written strictly conforming to the approved specifications. Unapproved feature sprawl is prohibited.
6. **Verify**: Execute all unit, integration, and SDD validation suites (`npm run verify`).
7. **Review**: Team peer review via GitHub Pull Request adhering to the PR template.
8. **Handover (`acceptance.md` & `HANDOVER.md`)**: Record actual test results, known limitations, and obtain explicit sign-off from the subsequent phase owner.

---

## 5. Coding & Quality Standards

- **Language**: TypeScript in strict mode (`"strict": true`).
- **Formatting**: Prettier with 100-character line limit and single quotes.
- **Linting**: ESLint (modern flat configuration) with zero unaddressed warnings.
- **Automated Testing**: Vitest test coverage for all core domain logic, scanners, parsers, and data converters.
- **Documentation**: All public exported functions, interfaces, and classes must include clear JSDoc comments explaining purpose, parameters, and return types.
