# Phase 3 Implementation Plan: IDE Interface & Project Passport Webview

> **Phase Owner:** Darshan  
> **Status:** READY FOR IMPLEMENTATION (Following Phase 2 Handover)

---

## 1. Architecture & Module Ownership

- **Owner**: Darshan
- **Target Modules**: `src/ui/`, `src/passport/`
- **Assisting / Review**: Monish (Tech Lead)

## 2. File Modification & Creation Inventory

- Files to modify:
  - `src/ui/index.ts`: UI service registration and lifecycle.
  - `src/ui/panel.ts`: Webview panel creation, HTML templating, and message dispatcher.
  - `src/passport/index.ts`: Project Passport data aggregation service.
  - `src/commands/showPassport.ts`: Connect command to Webview panel launcher.
  - `tests/unit/passport.test.ts`: Passport data aggregation tests.
  - `specs/phase-3/acceptance.md`: Record verification results.

## 3. Interfaces & Data Contracts

- Implement `IUiService` and message protocols in `src/ui/types.ts`.
- Implement `IPassportService` and `ProjectPassportData` in `src/passport/types.ts`.
- Message Contract:
  ```ts
  export type WebviewMessage =
    | { type: 'ready' }
    | { type: 'refresh' }
    | { type: 'search'; query: string }
    | { type: 'openFile'; filePath: string; line: number; column?: number };
  ```

## 4. Dependency Decisions

- Use Vanilla HTML, CSS, and TypeScript for Webview UI to ensure maximum performance, zero third-party framework overhead, and zero external network dependencies.

## 5. Implementation Sequence

1. Implement `PassportService` in `src/passport/` to query SQLite and compute metrics.
2. Build Webview HTML/CSS layout in `src/ui/panel.ts` matching native VS Code styles.
3. Wire two-way message passing between Webview and Extension Host.
4. Implement source navigation via `vscode.window.showTextDocument`.
5. Implement live client-side filtering and call-chain hierarchy tree.
6. Verify CSP and network isolation.

## 6. Testing Strategy

- Unit test Passport data aggregation with synthetic symbol and graph fixtures.
- Mock VS Code Webview messaging to test message handlers.
- Verify CSP headers and security boundary.
