# Changelog

All notable changes to **Project Passport** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - Phase 0 Blueprint - 2026-10-27

### Added

- Complete prototype repository blueprint and stable module architecture:
  - `src/commands/`: IDE command registration and dispatchers.
  - `src/core/`: Central interfaces, orchestrator contracts, and lifecycle types.
  - `src/scanner/`: Repository inventory and scanning interfaces.
  - `src/parser/`: Language parser and AST symbol extraction interfaces.
  - `src/graph/`: Dependency and call relationship graph interfaces.
  - `src/storage/`: SQLite storage and persistent cache contracts.
  - `src/analysis/`: Engineering findings and architectural rule interfaces.
  - `src/passport/`: High-level Project Passport data services.
  - `src/ui/`: VS Code webview panel and UI renderers.
  - `src/utils/`: Safe path handling and diagnostic logging utilities.
- Spec-Driven Development (SDD) infrastructure:
  - Canonical project constitution at `.specify/memory/constitution.md`.
  - Reusable templates for `spec.md`, `plan.md`, `tasks.md`, and `acceptance.md`.
  - Automated SDD artifact validator script `.specify/scripts/validate-sdd.mjs`.
  - Full specifications, plans, task breakdowns, and acceptance logs for Phases 0 through 4.
- Automated testing suite with Vitest:
  - Unit tests for core orchestrator and utility modules.
  - Integration test harness for extension commands.
  - Synthetic test fixtures (`tests/fixtures/sample-repo`).
- Developer tooling and automation:
  - `scripts/check-environment.mjs`: Validates Node, npm, Git, and platform capabilities.
  - `scripts/verify-project.mjs`: Runs comprehensive compilation, linting, formatting, testing, and SDD checks.
  - Modern ESLint flat config (`eslint.config.js`) and Prettier formatting.
  - VS Code extension launch and debug configurations (`.vscode/launch.json`, `.vscode/tasks.json`).
- Developer documentation suite in `docs/`:
  - `PHASE_0_README.md`: Master onboarding, setup, and handover guide.
  - `ARCHITECTURE.md`, `DEVELOPMENT.md`, `TESTING.md`, `PRIVACY.md`, `HANDOVER.md`, `KNOWN_LIMITATIONS.md`.
  - Architectural Decision Records (`ADR-001`, `ADR-002`, `ADR-003`).
- Phase 0 runnable baseline:
  - `project-passport.showPassport` command displaying quick project status.
  - `project-passport.scanWorkspace` command safely sampling workspace files without invoking any AI agent or external service.
