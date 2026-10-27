# Phase 3 Task Breakdown: IDE Interface & Project Passport Webview

> **Phase Owner:** Darshan  
> **Status:** PENDING (Waiting for Phase 2 Handover)

---

## Ordered Task List

| Task ID      | Description                                                | Predecessor      | Assignee | Expected Files                                    | Required Tests                             | Definition of Done                                                     |
| :----------- | :--------------------------------------------------------- | :--------------- | :------- | :------------------------------------------------ | :----------------------------------------- | :--------------------------------------------------------------------- |
| `TSK-P3-001` | Implement Passport data aggregation service                | Phase 2 Handover | Darshan  | `src/passport/index.ts`                           | Unit tests (`tests/unit/passport.test.ts`) | Aggregates file, symbol, and edge counts into `ProjectPassportData`    |
| `TSK-P3-002` | Build VS Code Webview Panel container & CSP                | `TSK-P3-001`     | Darshan  | `src/ui/panel.ts`                                 | Security & CSP check                       | Webview loads safely with strict CSP nonce and theme variables         |
| `TSK-P3-003` | Design and render Project Passport overview cards          | `TSK-P3-002`     | Darshan  | `src/ui/panel.ts`                                 | Visual & DOM inspection                    | Summary cards display totals for files, functions, classes, and calls  |
| `TSK-P3-004` | Implement interactive symbol list with live filtering      | `TSK-P3-003`     | Darshan  | `src/ui/panel.ts`                                 | Filter tests                               | Search input filters symbol list dynamically in < 50ms                 |
| `TSK-P3-005` | Implement function call-hierarchy inspector                | `TSK-P3-004`     | Darshan  | `src/ui/panel.ts`                                 | Hierarchy tests                            | Displays upstream callers and downstream callees for selected function |
| `TSK-P3-006` | Implement one-click editor source jump navigation          | `TSK-P3-005`     | Darshan  | `src/ui/panel.ts`, `src/commands/showPassport.ts` | Navigation tests                           | Clicking a symbol opens target file at accurate line in VS Code editor |
| `TSK-P3-007` | Connect refresh triggers to workspace change events        | `TSK-P3-006`     | Darshan  | `src/extension.ts`                                | Extension tests                            | Webview updates live when files are modified in workspace              |
| `TSK-P3-008` | Execute verification suite and complete Phase 3 acceptance | `TSK-P3-007`     | Darshan  | `specs/phase-3/acceptance.md`                     | `npm run verify`                           | All acceptance criteria executed with evidence recorded                |
