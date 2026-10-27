# Project Passport — Phase 0 Setup & Onboarding Guide

Welcome to **Project Passport: Credit-Free AI Codebase Intelligence**. This guide is the master onboarding manual for our four-person engineering team: **Monish** (Tech Lead / Architecture), **Ashif** (Scanner & Storage), **Nitish** (Parser & Graph), and **Darshan** (UI & Passport).

---

## 1. Phase 0 Purpose and Scope

Phase 0 establishes the complete repository blueprint, shared architectural contracts, Spec-Driven Development (SDD) governance, automated testing, and developer tooling **upfront**, before any developer begins implementation of their respective phases.

By establishing file ownership, interface boundaries, and quality pipelines before writing feature logic, Phase 0 guarantees:

- No file or directory structural churn across phases.
- Zero premature or speculative dependency installations.
- Strict isolation of responsibilities between team members.
- A runnable baseline extension that validates the development environment.

---

## 2. Prototype Overview and Architecture

Project Passport is a local-first IDE extension designed to analyze modern, AI-generated codebases. When code is rapidly produced by AI coding agents, developers frequently lose situational awareness of project structure, call chains, and architectural cohesion. Project Passport restores structural intelligence:

- Operates entirely locally within the IDE.
- Computes symbol definitions, dependencies, and call hierarchies deterministically.
- Never invokes AI inference or external APIs, preserving developer AI credits.
- Operates with zero network exfiltration.

The architecture flows sequentially:

1. **Scanner (`src/scanner/`)**: Discovers workspace files and calculates SHA-256 hashes.
2. **Storage (`src/storage/`)**: Manages local SQLite tables for files, symbols, and edges.
3. **Parser (`src/parser/`)**: Parses ASTs via Tree-sitter and extracts symbols.
4. **Graph (`src/graph/`)**: Builds dependency edges and function call hierarchies.
5. **Passport (`src/passport/`)**: Aggregates architecture metrics into a passport model.
6. **UI (`src/ui/`)**: Renders interactive VS Code Webview panels with one-click source jump.
7. **Analysis (`src/analysis/`)**: Evaluates static rules for circularity and dead code.

---

## 3. Team Members and Responsibilities

| Developer         | Phase Ownership           | Architectural Responsibility                                                               |
| :---------------- | :------------------------ | :----------------------------------------------------------------------------------------- |
| **Monish** (Lead) | **Phase 0** & **Phase 4** | Setup, Tooling, Core Contracts, SDD Foundation, Static Analysis Findings, Final Acceptance |
| **Ashif**         | **Phase 1**               | Workspace Scanner, SHA-256 Fingerprinting, Incremental File Watcher, SQLite Index          |
| **Nitish**        | **Phase 2**               | Tree-sitter Grammar Integration, AST Symbol Extraction, Dependency & Call Graph Engine     |
| **Darshan**       | **Phase 3**               | VS Code Webview Panel, Project Passport Overview UI, Source Code Jumping                   |

---

## 4. Verified System Prerequisites

Before starting, verify your machine meets these verified baselines:

- **Operating System**: Windows 10/11, macOS (Apple Silicon or Intel), or Linux (Ubuntu 22.04+).
- **Node.js**: LTS version >= 20.14.0.
- **npm**: Version >= 10.0.0.
- **Git**: Version >= 2.40.0.
- **IDE**: Visual Studio Code (version >= 1.90.0) or compatible VS Code-derived host.

---

## 5. Node.js and npm Installation Guidance

If you do not have Node.js LTS installed:

1. **Official Installer**: Download the LTS release from the [Official Node.js Download Portal](https://nodejs.org/en/download).
2. **Version Managers (Recommended)**:
   - On Windows: Use [fnm](https://github.com/Schniz/fnm) or [nvm-windows](https://github.com/coreybutler/nvm-windows):
     ```powershell
     winget install Schniz.fnm
     fnm install --lts
     fnm use --lts
     ```
   - On macOS/Linux: Use [fnm](https://github.com/Schniz/fnm) or `nvm`:
     ```bash
     curl -fsSL https://fnm.vercel.app/install | bash
     fnm install --lts
     ```
3. Verify installation:
   ```bash
   node -v   # Expected: v20.x.x or higher
   npm -v    # Expected: 10.x.x or higher
   ```

---

## 6. Git Installation and Configuration

1. **Download Git**: Download from [git-scm.com](https://git-scm.com/downloads) or install via package manager:
   - Windows: `winget install Git.Git`
   - macOS: `brew install git`
   - Linux: `sudo apt install git`
2. Configure your identity:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   git config --global core.autocrlf false   # Keep LF line endings
   ```

---

## 7. GitHub Account, Repository and Authentication Prerequisites

1. Ensure you have a valid GitHub account.
2. Install the GitHub CLI (`gh`) for seamless authentication:
   - Windows: `winget install GitHub.cli`
   - macOS: `brew install gh`
   - Linux: `sudo apt install gh`
3. Authenticate with GitHub:
   ```bash
   gh auth login
   ```
4. Verify authentication status:
   ```bash
   gh auth status
   ```

---

## 8. VS Code Installation

1. Install Visual Studio Code from [code.visualstudio.com](https://code.visualstudio.com/).
2. Recommended extensions (prompts automatically via `.vscode/extensions.json`):
   - **ESLint**: `dbaeumer.vscode-eslint`
   - **Prettier**: `esbenp.prettier-vscode`

---

## 9. Antigravity Compatibility Investigation and Fallback

During our architectural investigation:

- **Baseline Target**: Standard VS Code Extension API (`vscode` namespace ^1.90.0).
- **Antigravity Status**: Antigravity IDE provides an extension-compatible runtime based on the open VS Code extension host. However, standalone proprietary Antigravity APIs are subject to change.
- **Architectural Fallback Decision**: All core modules (`scanner`, `parser`, `graph`, `storage`, `analysis`) are implemented as pure, environment-agnostic TypeScript modules decoupled from VS Code APIs. The IDE UI bindings in `src/ui/` and `src/commands/` strictly use standard VS Code Extension APIs. This ensures Project Passport runs seamlessly in standard VS Code, Antigravity IDE, Cursor, and VSCodium without modification.

---

## 10. Dependency Installation

Phase 0 installs only the minimum verified devDependencies required to compile, bundle, lint, format, and test the starter extension:

```bash
npm install
```

This installs:

- `typescript` & `@types/node` & `@types/vscode`
- `esbuild` for ultra-fast bundling (< 1 sec)
- `vitest` for automated unit and integration tests
- `eslint` & `typescript-eslint` for static code quality
- `prettier` for deterministic code formatting

Future native modules (`better-sqlite3`, `tree-sitter`) will be introduced in Phases 1 and 2 respectively.

---

## 11. Repository Cloning and First-Time Setup

1. Clone the repository:
   ```bash
   git clone <REPO_URL> project-passport
   cd project-passport
   ```
2. Verify environment prerequisites:
   ```bash
   node ./scripts/check-environment.mjs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run project verification:
   ```bash
   npm run verify
   ```

---

## 12. Environment Variables

**No secret environment variables or API keys are required.**
Because Project Passport operates strictly local-first and never calls external LLM APIs, developer keys are never requested or stored.

Optional diagnostic variable:

- `DEBUG_PASSPORT=true`: Enables verbose debug logging to the extension output channel.

---

## 13. File Structure and Module Responsibilities

```
project-passport/
├── .specify/            # SDD governance, canonical constitution & templates
├── docs/                # Developer guides, ADRs & architectural documentation
├── specs/               # Five-phase specifications, plans, tasks & acceptance records
├── src/                 # Production source code
│   ├── commands/        # IDE command registrations (showPassport, scanWorkspace)
│   ├── core/            # Interfaces, shared types, orchestrator
│   ├── scanner/         # Phase 1: Workspace discovery & hashing (Ashif)
│   ├── parser/          # Phase 2: Tree-sitter AST symbol parsing (Nitish)
│   ├── graph/           # Phase 2: Dependency & call graph resolution (Nitish)
│   ├── storage/         # Phase 1: Local SQLite persistence (Ashif)
│   ├── analysis/        # Phase 4: Static analysis rules & findings (Monish)
│   ├── passport/        # Phase 3: Project Passport data service (Darshan)
│   ├── ui/              # Phase 3: Webview panel & DOM renderers (Darshan)
│   └── utils/           # Diagnostic logger and safe path utilities
├── tests/               # Vitest automated test suite & synthetic fixtures
└── scripts/             # Environment check and project verification scripts
```

---

## 14. TypeScript Configuration

- **`tsconfig.json`**: Configures strict typechecking for `src/` targeting `ES2022` with `NodeNext` resolution.
- **`tsconfig.test.json`**: Extends base config to support Vitest test runner across `tests/`.
- Strict mode is enforced (`"strict": true`, `"noImplicitReturns": true`, `"noUnusedLocals": true`).

---

## 15. Extension Manifest and Launch Configuration

- **Manifest (`package.json`)**: Configures extension activation events and contributes two commands:
  - `project-passport.showPassport`
  - `project-passport.scanWorkspace`
- **Launch Configuration (`.vscode/launch.json`)**:
  - `Run Extension (VS Code Development Host)`: Launches a secondary VS Code window with the extension activated.
  - `Debug Vitest Tests`: Debugs tests in the integrated terminal with breakpoints enabled.

---

## 16. Development, Watch, and Debugging Instructions

1. Start watch build:
   ```bash
   npm run watch
   ```
2. Press `F5` in VS Code to open the **Extension Development Host** window.
3. In the new window, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) and type:
   `Project Passport: Open Overview`
4. The Project Passport baseline Webview panel will open.

---

## 17. Build, Lint, Format, and Test Commands

| Command                | Purpose                                                            |
| :--------------------- | :----------------------------------------------------------------- |
| `npm run check-env`    | Verifies Node.js, npm, Git, and OS platform readiness.             |
| `npm run validate:sdd` | Validates presence and structure of all 5 SDD phase artifacts.     |
| `npm run compile`      | Runs TypeScript compiler checks without emitting files.            |
| `npm run build`        | Bundles `src/extension.ts` into `dist/extension.js` via `esbuild`. |
| `npm run watch`        | Runs `esbuild` in incremental watch mode.                          |
| `npm run lint`         | Runs ESLint over all TypeScript source files.                      |
| `npm run format`       | Formats all code using Prettier.                                   |
| `npm run format:check` | Checks if all files conform to Prettier formatting.                |
| `npm run test`         | Runs the Vitest automated test suite.                              |
| `npm run verify`       | Runs the complete verification pipeline end-to-end.                |

---

## 18. SDD Workflow and Phase Approval Procedure

Every developer must follow the 8-stage SDD lifecycle:

1. **Specify**: Check `specs/phase-<N>/spec.md` requirements and acceptance criteria.
2. **Plan**: Review `specs/phase-<N>/plan.md` architectural design.
3. **Tasks**: Follow assigned tasks in `specs/phase-<N>/tasks.md`.
4. **Approve**: Obtain Monish's review before altering interfaces or scope.
5. **Implement**: Write code strictly inside the phase's designated module.
6. **Verify**: Ensure `npm run verify` passes with 0 errors.
7. **Review**: Submit Pull Request with completed PR template.
8. **Handover**: Execute acceptance tests, record results in `acceptance.md`, and complete `docs/HANDOVER.md`.

---

## 19. Git Branching, Commits, Pull Requests, and Code Reviews

- **Base branch**: `main`
- **Feature branch format**: `feature/phase-<N>-<topic>` (e.g., `feature/phase-1-scanner`)
- **Bug fix branch format**: `fix/<topic>`
- **Commit style**: Conventional Commits:
  - `feat(scanner): implement SHA-256 file hashing`
  - `test(graph): add call hierarchy resolution assertions`
  - `chore(tooling): update lint configuration`
- **Pull Requests**: Must link to Phase Task IDs and provide verification evidence.

---

## 20. Shared Interfaces and File Ownership Rules

- All shared interfaces are defined in `src/core/types.ts`.
- **Do not modify files owned by another phase** without prior agreement with the phase owner.
- Never add new directories to `src/` without an approved specification update.

---

## 21. Privacy and Network Behavior

- **Strict Local-First Guarantee**: Project Passport never opens outbound network sockets to transmit code, symbols, or logs.
- Automated tests include network isolation assertions to prevent accidental egress.
- SQLite databases are created locally in `.passport/` and are strictly excluded from Git.

---

## 22. Phase 0 Acceptance Checklist

- [x] Complete directory structure created upfront.
- [x] All 5 phase specifications, plans, tasks, and acceptance files present.
- [x] Canonical constitution established at `.specify/memory/constitution.md`.
- [x] Core contracts and module boundaries codified in `src/core/types.ts`.
- [x] Starter extension and commands registered.
- [x] Automated test suite passing with Vitest.
- [x] Verification scripts (`check-environment.mjs`, `verify-project.mjs`, `validate-sdd.mjs`) functional.
- [x] Zero lint or TypeScript compiler errors.

---

## 23. Phase 1 Prerequisites and Handover

For **Ashif** to begin Phase 1:

1. Phase 0 verification must be confirmed passing via `npm run verify`.
2. Review `specs/phase-1/spec.md` and `specs/phase-1/plan.md`.
3. Check `src/scanner/types.ts` and `src/storage/types.ts` for contract boundaries.
4. Create feature branch: `feature/phase-1-scanner-index`.
5. Implement `ScannerService` and `SqliteStorageService` following `specs/phase-1/tasks.md`.

---

## 24. Troubleshooting

- **Node version mismatch**: Ensure Node >= 20.14.0 is active via `fnm use --lts` or `nvm use 20`.
- **TypeScript build errors**: Run `npm run compile` to inspect compiler diagnostics.
- **Webview does not load**: Check Extension Development Host Developer Tools (`Help > Toggle Developer Tools`) for CSP console messages.
- **Git line ending issues on Windows**: Ensure `core.autocrlf` is set to `false` and run `git checkout-index --force --all`.

---

## 25. Known Limitations and Unverified Compatibility Claims

- **Phase 0 Baseline**: Currently returns baseline sample metrics; full symbol extraction and call hierarchy become active in Phases 1 and 2.
- **Tree-sitter Language Support**: Prototype target covers TypeScript/JavaScript and Python; other languages will be evaluated for future production releases.
- **Standalone Antigravity IDE APIs**: Not relied upon directly; Project Passport uses standard VS Code Extension APIs to ensure universal compatibility.
