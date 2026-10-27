# Project Passport — Local-First Privacy Model & Guarantees

---

## 1. Zero-Exfiltration Privacy Invariant

Project Passport provides deterministic intelligence without compromising the privacy of proprietary source code.

1. **Local Analysis Only**: All Tree-sitter parsing, relationship indexing, and SQLite querying execute exclusively in the local Node.js process.
2. **Zero Network Calls**: The production extension contains no HTTP, WebSocket, or gRPC clients. No telemetry or analytics exist.
3. **Credit-Free**: Unlike AI coding assistants, Project Passport never invokes external LLMs or agent APIs, preserving developer token quotas.
4. **Local Database Security**: SQLite databases are stored in workspace-scoped folders and are strictly `.gitignore`d.

---

## 2. Automated Verification

Our automated verification suite includes network monitoring assertions to guarantee that no outbound sockets are created during scanner, parser, or UI operation.
