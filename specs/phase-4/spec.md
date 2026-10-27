# Phase 4 Specification: Static Analysis Findings & Final Acceptance

> **Phase Owner:** Monish (Technical Lead)  
> **Status:** SPECIFICATION READY (Awaiting Phase 3 Handover)  
> **Target Release:** 0.1.0-prototype-final

---

## 1. Problem Statement

Having a symbol inventory and call graph is powerful, but developers reviewing AI-generated code also need explicit, actionable engineering findings. AI code generators often produce circular dependencies, orphan/dead functions that are never called, or massive monolith ("god") files. Phase 4 provides deterministic, rule-based static analysis findings and leads the final cross-phase acceptance and verification of the prototype.

## 2. Goals & Success Metrics

- **Primary Goal**: Deliver a deterministic analysis rule engine producing evidence-backed architecture findings and perform full end-to-end acceptance across all four phases.
- **Key Metrics**:
  - Detect circular dependencies with exact cycle paths.
  - Identify dead/orphan entrypoints (unreferenced exported functions).
  - Flag files with extreme symbol density or missing type annotations.
  - Deliver comprehensive final acceptance sign-off for the 0.1.0 prototype.

## 3. In-Scope Requirements

- **`REQ-P4-001`**: Implement static analysis rule engine framework in `src/analysis/`.
- **`REQ-P4-002`**: Implement Circular Dependency Rule: Detects direct and indirect cycles in the dependency graph.
- **`REQ-P4-003`**: Implement Dead Symbol / Orphan Rule: Identifies functions or components with zero incoming callers.
- **`REQ-P4-004`**: Implement Analysis Findings Data Model: Each finding contains ID, rule ID, severity (`info`, `warning`, `critical`), title, description, and source locations.
- **`REQ-P4-005`**: Surface findings inside the Project Passport Webview dashboard and VS Code Problems pane.
- **`REQ-P4-006`**: Perform end-to-end integration testing across Scanner, Parser, Graph, Storage, UI, and Analysis.
- **`REQ-P4-007`**: Verify local-first privacy invariant under live network monitoring.
- **`REQ-P4-008`**: Document known limitations, benchmark metrics, and prepare the production roadmap.

## 4. Explicit Out-of-Scope Items

- `OUT-P4-001`: Auto-fixing code via AI generation (violates zero credit/offline constraint).
- `OUT-P4-002`: Dynamic runtime tracing or memory profiling.
- `OUT-P4-003`: Cloud vulnerability database lookups (CVE syncing).

## 5. Non-Functional Requirements

- **Deterministic**: Analysis rules must yield 100% reproducible results for the same graph state.
- **Performance**: Rule evaluation over a 10,000-node graph in < 250 milliseconds.

## 6. Interfaces & Dependencies

- Implements: `src/analysis/types.ts` (`IAnalysisService`, `AnalysisFinding`, `IAnalysisRule`).
- Consumes: `src/graph/types.ts` (`IGraphService`) and `src/storage/types.ts`.
- Exports findings to: `src/passport/types.ts` and `src/ui/types.ts`.

## 7. Failure Handling & Edge Cases

- Extremely deeply nested call graphs: Cap cycle detection depth to prevent call-stack overflows.
- Partial graph state during re-index: Defer analysis until indexing transaction commits.

## 8. Acceptance Criteria

- [ ] `AC-P4-001`: Rule engine detects synthetic circular dependency in `tests/fixtures/sample-repo`.
- [ ] `AC-P4-002`: Uncalled functions flagged as orphan warnings with accurate line numbers.
- [ ] `AC-P4-003`: Findings render in the Project Passport UI with clickable source links.
- [ ] `AC-P4-004`: Full automated test suite passes with 100% success rate across all modules.
- [ ] `AC-P4-005`: Live network traffic monitor confirms 0 bytes uploaded to external networks.
- [ ] `AC-P4-006`: Final prototype documentation, limitations, and ADRs reviewed and approved.

## 9. Risks & Open Questions

- **Risk**: False positives on exported public API functions in library code.  
  _Mitigation_: Mark findings with severity `info` and allow user configuration for library entrypoints.
