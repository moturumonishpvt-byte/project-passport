# Project Passport: Credit-Free AI Codebase Intelligence

> **Local-first IDE extension delivering deterministic codebase intelligence, symbol graphs, and architectural health findings without consuming developer AI credits.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Runtime](https://img.shields.io/badge/Node.js-LTS%20%3E%3D20.14-blue.svg)](https://nodejs.org)
[![Testing: Vitest](https://img.shields.io/badge/Tested%20with-Vitest-brightgreen.svg)](https://vitest.dev)
[![Spec-Driven](https://img.shields.io/badge/Process-Spec--Driven%20Development-purple.svg)](./.specify/memory/constitution.md)

---

## 1. Product Overview & Prototype Objectives

When developers build applications with AI coding agents, thousands of lines of code can be generated in minutes. However, developers quickly face two major pain points:

1. **Architectural Blindness**: Losing the mental model of how components, functions, and imports relate across the growing codebase.
2. **AI Credit Drain**: Re-querying AI coding agents for simple structural questions ("Where is this called?", "Is this dead code?", "What does this import?") rapidly burns through expensive monthly agent credit quotas.

**Project Passport** solves this by providing deterministic, local-first codebase intelligence inside your IDE:

- **Instant Symbol & Call Graph**: Accurate AST-driven function call trees and dependency graphs.
- **Credit-Free**: Powered entirely by local Tree-sitter parsers and SQLite querying — zero LLM tokens used.
- **Privacy-First**: No code or telemetry ever leaves your workstation (zero exfiltration).
- **Interactive Passport UI**: VS Code Webview panel with one-click editor navigation.

### Prototype Objectives

- Establish a credit-independent codebase indexer and dependency visualizer.
- Deliver an automated 5-phase Spec-Driven Development (SDD) foundation allowing team members to contribute sequentially without structural churn.
- Maintain strict local-first privacy, zero network exfiltration, and high performance on repositories up to 10,000 files.

---

## 2. Development Team & Phase Responsibilities

| Team Member | Role                      | Assigned Phase | Scope & Key Deliverables                                                                        |
| :---------- | :------------------------ | :------------- | :---------------------------------------------------------------------------------------------- |
| **Monish**  | Technical Lead            | **Phase 0**    | Blueprint, contracts, build pipelines, SDD framework, and baseline starter extension            |
| **Ashif**   | Backend Engineer          | **Phase 1**    | Workspace scanner, incremental file watcher, SQLite index schema, and file repository           |
| **Nitish**  | Language / AST Specialist | **Phase 2**    | Tree-sitter AST parser, symbol extractor, dependency/call graph builder                         |
| **Darshan** | Frontend / UI Specialist  | **Phase 3**    | Webview UI, architecture overview panel, graph visualizer, and file navigation                  |
| **Monish**  | Technical Lead            | **Phase 4**    | Static analysis rule engine (circular imports, orphan symbols), acceptance testing, and release |

---

## 3. Five-Phase SDD Workflow

Project Passport enforces strict **Spec-Driven Development (SDD)** governed by the canonical [Constitution](./.specify/memory/constitution.md). Every phase follows an 8-step lifecycle:

```mermaid
flowchart LR
    A[1. Specify] --> B[2. Plan]
    B --> C[3. Tasks]
    C --> D[4. Approve]
    D --> E[5. Implement]
    E --> F[6. Verify]
    F --> G[7. Review]
    G --> H[8. Handover]
```

1. **Specify**: Define functional requirements and explicit acceptance criteria in `specs/phase-N/spec.md`.
2. **Plan**: Establish architectural design, module interfaces, and risk analysis in `specs/phase-N/plan.md`.
3. **Tasks**: Break down implementation into granular, test-linked work items in `specs/phase-N/tasks.md`.
4. **Approve**: Technical Lead reviews and signs off on the specification before code is written.
5. **Implement**: Code the feature strictly within assigned module boundaries.
6. **Verify**: Execute the full verification suite (`npm run verify`) and record evidence in `specs/phase-N/acceptance.md`.
7. **Review**: Peer code review and acceptance criteria verification.
8. **Handover**: Update [docs/HANDOVER.md](./docs/HANDOVER.md) and transition to the next phase owner.

---

## 4. Quick Start: Installation, Verification & Launch

### Prerequisites

- **Node.js**: LTS `>=20.14.0`
- **npm**: `>=10.0.0`
- **Git**: `>=2.40.0`

### 1. Clone & Check Environment

```bash
git clone https://github.com/moturumonishpvt-byte/project-passport.git
cd project-passport
node ./scripts/check-environment.mjs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Project Verification

Execute the automated 7-step verification pipeline (environment, SDD audit, Prettier, ESLint, TypeScript, esbuild bundle, and Vitest test suite):

```bash
npm run verify
```

### 4. Launch the Extension in Development Mode

1. Open the repository root in VS Code or Antigravity IDE.
2. Press `F5` (or run `Extension (Development Host)` from the Run & Debug view).
3. In the new Extension Development Host window:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette.
   - Run: `Project Passport: Open Overview` (launches the Webview UI).
   - Run: `Project Passport: Sample Workspace Files (Phase 0 Baseline)` (tests baseline scanner).

---

## 5. Current Prototype Limitations & Compatibility Status

### Limitations (Phase 0 Prototype Baseline)

- **Deferred Implementations**: SQLite indexing (Phase 1), Tree-sitter parsing (Phase 2), interactive graph visualization (Phase 3), and static analysis rules (Phase 4) are stubbed with typed contracts and deferred by design.
- **Sample Data**: The current Webview displays baseline prototype metrics and sample workspace files discovered via standard VS Code workspace APIs.

### Compatibility Status

- **VS Code Extension API**: Targets standard API `^1.90.0`, compatible with modern VS Code and Antigravity IDE without proprietary extensions or private hooks.
- **Operating Systems**: Tested and verified on Windows 11 (x64), Linux, and macOS.
- **Privacy & Security**: Zero remote telemetry, zero external network requests, zero LLM credit consumption.

For detailed limitations and roadmap, see [docs/KNOWN_LIMITATIONS.md](./docs/KNOWN_LIMITATIONS.md).

---

## 6. Complete Documentation Index

- **Onboarding & Setup**: [Phase 0 Onboarding & Setup Guide](./docs/PHASE_0_README.md)
- **Architecture**: [System Architecture & Data Contracts](./docs/ARCHITECTURE.md)
- **Development Process**: [Spec-Driven Development (SDD) Guide](./docs/DEVELOPMENT.md)
- **Testing**: [Automated Testing Strategy & Fixtures](./docs/TESTING.md)
- **Privacy Guarantees**: [Zero-Exfiltration & Privacy Policy](./docs/PRIVACY.md)
- **Team Handover**: [Phase Handover Protocol](./docs/HANDOVER.md)
- **Technical Decisions**: [Architecture Decision Records (ADRs)](./docs/decisions/)
  - [ADR-001: Local-First Architecture](./docs/decisions/ADR-001-local-first-architecture.md)
  - [ADR-002: Tree-sitter AST Parsing](./docs/decisions/ADR-002-tree-sitter-parsing.md)
  - [ADR-003: SQLite Local Index](./docs/decisions/ADR-003-sqlite-local-index.md)
