# Project Passport — Automated Testing Strategy

---

## 1. Test Pyramid

Project Passport utilizes a three-tier automated test hierarchy built on **Vitest**:

1. **Unit Tests (`tests/unit/`)**:
   - Fast, isolated in-memory tests (< 10ms per test).
   - Test orchestrator, hashing, Tree-sitter symbol extractors, graph algorithms, and utility loggers.
2. **Integration Tests (`tests/integration/`)**:
   - Multi-module tests linking scanner, parser, storage, and UI messaging.
   - Verified against synthetic fixtures in `tests/fixtures/sample-repo`.
3. **End-to-End Tests (`tests/e2e/`)**:
   - Full pipeline execution from file discovery to Webview presentation.

---

## 2. Test Execution Commands

```bash
# Run test suite once
npm run test

# Run tests in interactive watch mode
npm run test:watch
```

---

## 3. Ground Truth Verification Invariant

- Never pre-mark unexecuted tests as passing in `acceptance.md`.
- All acceptance sign-offs require recorded command outputs.
- Test suites must assert that zero outbound network sockets are opened during analysis.
