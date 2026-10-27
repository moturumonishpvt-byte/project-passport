---
name: Feature / Specification Change Request
about: Propose an enhancement or an amendment to an SDD specification
title: '[FEAT/SPEC] '
labels: ['enhancement', 'spec-change']
assignees: ''
---

**Specification Reference**

- Phase (`specs/phase-<N>/spec.md`):
- Requirement ID (e.g. `REQ-P1-002`):

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Proposed Change**
Describe the proposed solution or updated requirement.

**Impact on Architecture & Module Boundaries**
Will this require changes to shared contracts in `src/core/types.ts` or module interfaces?

- [ ] Yes (requires architecture review & approval by Monish)
- [ ] No (contained within phase module boundaries)

**Local-First & Privacy Verification**

- [ ] Confirmed zero outbound network calls and zero credit consumption.
