# Phase 3 Specification: IDE Interface & Project Passport Webview

> **Phase Owner:** Darshan  
> **Status:** SPECIFICATION READY (Awaiting Phase 2 Handover)  
> **Target Release:** 0.1.0-prototype-p3

---

## 1. Problem Statement

Developers need an intuitive, interactive interface inside their IDE to visualize the codebase structure, explore function call chains, and navigate directly to source code definitions without having to read raw database tables or console logs. Phase 3 delivers the VS Code Webview panel, interactive architecture diagramming, symbol search, and editor source-jumping.

## 2. Goals & Success Metrics

- **Primary Goal**: Deliver a responsive, beautiful, dark/light theme-adaptive Project Passport webview in VS Code that renders repository structure, call relationships, and enables one-click editor navigation.
- **Key Metrics**:
  - Webview initial load and render in < 500 milliseconds.
  - Interactive exploration of symbols, imports, and callers.
  - Clicking any symbol opens the exact source file and highlights the line in the active VS Code editor.
  - Strict Content Security Policy (CSP); zero external script CDNs or outbound network calls.

## 3. In-Scope Requirements

- **`REQ-P3-001`**: Implement VS Code Webview panel registered under `project-passport.showPassport` command.
- **`REQ-P3-002`**: Render the "Project Passport" dashboard: summary metrics (files indexed, total symbols, functions, classes, imports), indexing status, and dependency graphs.
- **`REQ-P3-003`**: Implement interactive symbol browser with live filtering by name, kind (function/class), and file.
- **`REQ-P3-004`**: Provide visual call-chain inspector showing incoming callers and outgoing callees for a selected function.
- **`REQ-P3-005`**: Implement two-way message protocol between Webview and extension host to request data and trigger navigation.
- **`REQ-P3-006`**: Source navigation: Clicking a symbol triggers `vscode.workspace.openTextDocument` and highlights the line.
- **`REQ-P3-007`**: Enforce strict Content Security Policy (CSP) with local script nonces and disable external resources.

## 4. Explicit Out-of-Scope Items

- `OUT-P3-001`: Direct source code editing inside the Webview canvas (editing occurs in the native editor).
- `OUT-P3-002`: Remote webview embedding or external browser hosting.
- `OUT-P3-003`: Calling cloud AI services to summarize functions.

## 5. Non-Functional Requirements

- **UI Performance**: Smooth 60fps animations; immediate response on filter typing.
- **Theme Support**: Seamless matching of VS Code theme variables (`--vscode-editor-background`, `--vscode-foreground`, etc.).

## 6. Interfaces & Dependencies

- Implements: `src/ui/types.ts` (`IUiService`, `WebviewMessage`, `WebviewResponse`).
- Implements: `src/passport/types.ts` (`IPassportService`, `ProjectPassportData`).
- Consumes: `src/core/types.ts` and `src/graph/types.ts`.

## 7. Failure Handling & Edge Cases

- Empty workspace / no files indexed: Display helpful empty state with "Scan Workspace" action.
- Webview disposed: Cancel pending UI queries and clean up event listeners.
- Missing target file on navigation: Display notification if file was moved or deleted.

## 8. Acceptance Criteria

- [ ] `AC-P3-001`: Running `project-passport.showPassport` opens the webview panel without errors.
- [ ] `AC-P3-002`: Passport summary displays accurate counts matching the SQLite index.
- [ ] `AC-P3-003`: Live search filters symbols instantly.
- [ ] `AC-P3-004`: Clicking a symbol in the webview opens the target file at the correct line in VS Code.
- [ ] `AC-P3-005`: Webview HTML contains a valid, strict Content Security Policy meta tag.
- [ ] `AC-P3-006`: Zero external web resources, fonts, or scripts loaded.

## 9. Risks & Open Questions

- **Risk**: Large graph datasets causing Webview DOM lag.  
  _Mitigation_: Paginate symbol lists and implement virtual scrolling or lazy node expansion in call trees.
