# Contributing to Project Passport

Thank you for contributing to Project Passport! We use **Spec-Driven Development (SDD)** across all phases to ensure predictable, high-quality development without structural fragmentation.

## Team Phase Responsibilities

- **Monish**: Phase 0 (Repository setup, architecture, SDD tooling), Phase 4 (Static analysis findings, acceptance)
- **Ashif**: Phase 1 (Repository scanner and SQLite local indexing)
- **Nitish**: Phase 2 (Tree-sitter parser and code relationship graph)
- **Darshan**: Phase 3 (IDE interface and Project Passport visual webview)

## Spec-Driven Development (SDD) Workflow

No code may be written until the corresponding phase specification and plan are approved. Every phase follows an 8-step lifecycle:

```
1. Specify  ──▶ 2. Plan ──▶ 3. Task Breakdown ──▶ 4. Approve
                                                      │
8. Handover ◀── 7. Review ◀── 6. Verify ◀── 5. Implement
```

### Required Phase Artifacts

Each phase folder under `specs/phase-<N>/` must include:

- `spec.md`: Problem statement, scope, functional requirements (with IDs), and acceptance criteria.
- `plan.md`: Technical approach, architecture, file changes, and risk mitigations.
- `tasks.md`: Sequenced, assigned tasks with definitions of done.
- `acceptance.md`: Verification results and sign-off records (actual results recorded upon execution).

## Development Rules

1. **No Structural Churn**: Do not create new architectural directories without an approved specification change. Modify the scaffolded modules in `src/`.
2. **Local-First Always**: Never introduce dependencies that make outbound network requests, phone home, or upload code.
3. **Run Verification Before PR**:
   ```bash
   npm run check-env
   npm run validate:sdd
   npm run lint
   npm run compile
   npm run test
   npm run verify
   ```
4. **Branching Strategy**: Branch from `main` using `feature/phase-<N>-<topic>` or `fix/<topic>`. Submit PRs using the PR template.
