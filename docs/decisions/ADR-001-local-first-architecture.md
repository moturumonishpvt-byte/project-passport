# ADR-001: Local-First, Zero-Exfiltration Intelligence Architecture

## Status

Accepted

## Context

Developers working with AI coding agents require structural intelligence about rapidly changing codebases. Traditional solutions either stream code to cloud services or invoke AI model APIs, exhausting token quotas and raising IP/privacy concerns.

## Decision

Project Passport will operate entirely locally. All file discovery, AST parsing, call-graph generation, and SQLite caching will execute within the developer's local environment. Outbound network telemetry and external AI API calls are strictly forbidden.

## Consequences

- **Positive**: Zero API token costs; 100% offline functionality; zero corporate IP risk.
- **Negative**: Analysis capabilities are limited to deterministic algorithms rather than fuzzy LLM heuristics.
