# ADR-003: SQLite for Local Persistent Index

## Status

Accepted

## Context

Project Passport needs persistent caching of file fingerprints, extracted symbols, and graph edges so that incremental re-indexing can skip unchanged files. Options evaluated: in-memory Map (lost on deactivation), LevelDB (no ACID transactions), SQLite (ACID, single-file, portable).

## Decision

Use **SQLite** via a compatible Node.js binding for the local persistent index. The preferred binding is `better-sqlite3` (synchronous, high-performance API) with a WASM fallback (e.g. `sql.js`) if native compilation fails in certain extension host environments.

## Consequences

- **Positive**: ACID transactions prevent database corruption during incremental updates; single `.sqlite` file is trivially `.gitignore`d; rich FTS5 full-text search support for future Phase 1+ search functionality.
- **Negative**: Native C++ binding requires platform-specific prebuild or WASM fallback strategy. Mitigation: validate binding compilation in CI and document fallback steps in `docs/KNOWN_LIMITATIONS.md`.
