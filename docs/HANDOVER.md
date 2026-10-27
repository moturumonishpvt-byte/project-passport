# Project Passport — Phase Handover Protocol

---

## 1. Handover Requirements

A phase cannot be considered complete until:

1. All tasks in `specs/phase-<N>/tasks.md` are completed.
2. All acceptance criteria in `specs/phase-<N>/acceptance.md` have been executed with concrete recorded evidence.
3. `npm run verify` passes with 0 errors across all checks.
4. The outgoing phase owner conducts a walk-through with the incoming phase owner.
5. The incoming phase owner explicitly accepts the handover.

---

## 2. Handover Matrix

| From Phase  | Outgoing Owner | To Phase    | Incoming Owner | Handover Checklist Signed | Acceptance Status                                 |
| :---------- | :------------- | :---------- | :------------- | :------------------------ | :------------------------------------------------ |
| **Phase 0** | Monish         | **Phase 1** | Ashif          | `[x]` Signed (Monish)     | Ready for Handover (7/7 verification checks PASS) |
| **Phase 1** | Ashif          | **Phase 2** | Nitish         | `[ ]` Pending             | Ready to commence Phase 1                         |
| **Phase 2** | Nitish         | **Phase 3** | Darshan        | `[ ]` Pending             | Blocked by Phase 1                                |
| **Phase 3** | Darshan        | **Phase 4** | Monish         | `[ ]` Pending             | Blocked by Phase 2                                |
| **Phase 4** | Monish         | **Release** | All Team       | `[ ]` Pending             | Blocked by Phase 3                                |
