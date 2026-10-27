# Project Passport: Credit-Free AI Codebase Intelligence

> **Local-first IDE extension delivering deterministic codebase intelligence, symbol graphs, and architectural health findings without consuming developer AI credits.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Runtime](https://img.shields.io/badge/Node.js-LTS%20%3E%3D20.14-blue.svg)](https://nodejs.org)
[![Testing: Vitest](https://img.shields.io/badge/Tested%20with-Vitest-brightgreen.svg)](https://vitest.dev)
[![Spec-Driven](https://img.shields.io/badge/Process-Spec--Driven%20Development-purple.svg)](./.specify/memory/constitution.md)

---

## What is Project Passport?

When developers build applications with AI coding agents, thousands of lines of code can be generated in minutes. However, developers quickly face two major pain points:

1. **Architectural Blindness**: Losing the mental model of how components, functions, and imports relate across the growing codebase.
2. **AI Credit Drain**: Re-querying AI coding agents for simple structural questions ("Where is this called?", "Is this dead code?", "What does this import?") rapidly burns through expensive monthly agent credit quotas.

**Project Passport** solves this by providing deterministic, local-first codebase intelligence inside your IDE:

- **Instant Symbol & Call Graph**: Accurate AST-driven function call trees and dependency graphs.
- **Credit-Free**: Powered entirely by local Tree-sitter parsers and SQLite querying — zero LLM tokens used.
- **Privacy-First**: No code or telemetry ever leaves your workstation.
- **Interactive Passport UI**: VS Code Webview panel with one-click editor navigation.

---

## Development Team

- **Monish** (Tech Lead): Phase 0 (Architecture & Blueprint), Phase 4 (Static Analysis Findings & Acceptance)
- **Ashif**: Phase 1 (Workspace Scanner, Incremental Watcher & SQLite Index)
- **Nitish**: Phase 2 (Tree-sitter Language Parsers & Relationship Graph Engine)
- **Darshan**: Phase 3 (VS Code Webview UI & Project Passport Overview)

---

## Quick Start for Developers

1. **Read Onboarding Guide**: Start with [docs/PHASE_0_README.md](./docs/PHASE_0_README.md).
2. **Verify Environment**:
   ```bash
   node ./scripts/check-environment.mjs
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run Verification Suite**:
   ```bash
   npm run verify
   ```
5. **Launch Starter Extension**:
   Open in VS Code, press `F5`, and run `Project Passport: Open Overview` from the Command Palette (`Ctrl+Shift+P`).

---

## Documentation Index

- [Phase 0 Onboarding & Setup Guide](./docs/PHASE_0_README.md)
- [System Architecture & Data Flow](./docs/ARCHITECTURE.md)
- [Spec-Driven Development (SDD) Guide](./docs/DEVELOPMENT.md)
- [Automated Testing Strategy](./docs/TESTING.md)
- [Local-First Privacy Guarantees](./docs/PRIVACY.md)
- [Phase Handover Protocol](./docs/HANDOVER.md)
- [Known Limitations & Roadmap](./docs/KNOWN_LIMITATIONS.md)
- [Architecture Decision Records (ADRs)](./docs/decisions/)
