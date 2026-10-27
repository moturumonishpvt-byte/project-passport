# Project Passport — Known Limitations & Scope Boundaries

> **Target Version:** 0.1.0 Prototype Baseline

---

## 1. Supported Behavior in 0.1.0 Prototype

- Complete repository blueprint and SDD governance.
- Minimal runnable starter extension with `project-passport.showPassport` and `project-passport.scanWorkspace`.
- Pure TypeScript contracts and interface definitions across all 8 architectural modules.
- Fast bundling via `esbuild` and automated testing via `Vitest`.

---

## 2. Unimplemented Features (Deferred by Design)

- **SQLite Database Persistence**: Scheduled for **Phase 1** (Ashif).
- **Tree-sitter Language Parsing**: Scheduled for **Phase 2** (Nitish).
- **Interactive Call Graph Webview**: Scheduled for **Phase 3** (Darshan).
- **Static Analysis Rule Engine**: Scheduled for **Phase 4** (Monish).

---

## 3. Environment & Compatibility Observations

- **Antigravity IDE Compatibility**: Antigravity IDE runs extension host instances compatible with the standard VS Code Extension API. By targeting the standard VS Code Extension API, Project Passport avoids proprietary lock-in.
- **Node Native Bindings**: Native modules for Tree-sitter and SQLite will require cross-platform pre-builds (or WASM fallbacks) in Phases 1 and 2.
