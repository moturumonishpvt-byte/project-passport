# Phase 4 Implementation Plan: Static Analysis Findings & Final Acceptance

> **Phase Owner:** Monish (Technical Lead)  
> **Status:** READY FOR IMPLEMENTATION (Following Phase 3 Handover)

---

## 1. Architecture & Module Ownership

- **Owner**: Monish
- **Target Modules**: `src/analysis/`, system-wide integration
- **Reviewers**: Ashif, Nitish, Darshan

## 2. File Modification & Creation Inventory

- Files to modify:
  - `src/analysis/index.ts`: Implement `AnalysisService`.
  - `src/analysis/rules/circularDependencyRule.ts`: Cycle detection logic.
  - `src/analysis/rules/orphanSymbolRule.ts`: Dead symbol detection.
  - `src/ui/panel.ts`: Add findings list to Webview panel.
  - `tests/integration/fullPipeline.test.ts`: End-to-end multi-module test.
  - `specs/phase-4/acceptance.md`: Record final verification results.

## 3. Interfaces & Data Contracts

- Implement `IAnalysisService`, `AnalysisFinding`, and `IAnalysisRule` in `src/analysis/types.ts`.
- Interface Contract:
  ```ts
  export interface AnalysisFinding {
    id: string;
    ruleId: string;
    title: string;
    description: string;
    severity: 'info' | 'warning' | 'critical';
    filePath: string;
    startLine: number;
    endLine: number;
  }
  ```

## 4. Dependency Decisions

- Use zero external runtime dependencies; all graph algorithms (Tarjan's strongly connected components or DFS cycle detection) implemented in clean, pure TypeScript.

## 5. Implementation Sequence

1. Implement rule engine runner in `src/analysis/`.
2. Implement Tarjan / DFS cycle detection for circular dependency rule.
3. Implement orphan symbol detection querying zero-in-degree graph nodes.
4. Integrate findings into `PassportService` and Webview panel.
5. Execute end-to-end integration and network privacy tests.
6. Compile final acceptance report.

## 6. Testing Strategy

- Unit test each rule on synthetic directed graphs.
- End-to-end integration test across real repository fixture.
- Automated assertion of 0 external network calls.
