# Security Policy

## Core Privacy and Security Guarantees

Project Passport is engineered under a strict **Local-First, Zero-Exfiltration Privacy Model**:

1. **No Source Code Uploads**: Your source code, ASTs, file metadata, and indexes never leave your local machine.
2. **Credit-Free / No Agent Invocations**: The extension operates entirely via local static analysis and tree parsing. It does **not** call LLM APIs, external inference providers, or consume developer AI credits.
3. **No Hidden Telemetry**: There is no tracking, advertising, analytics, or behavioral telemetry.
4. **Local Database Security**: SQLite databases are stored in workspace-scoped local directories and must never be committed to source control.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability or accidental network egress bug in Project Passport:

1. **Do not open a public issue.**
2. Send an email to Monish (Technical Lead) at `moturumonishpvt@gmail.com`.
3. Include detailed steps to reproduce, network capture logs (if demonstrating exfiltration), and platform information.
4. We will acknowledge receipt within 48 hours and coordinate remediation.
