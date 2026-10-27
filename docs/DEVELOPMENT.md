# Project Passport — Development & SDD Workflow Guide

> **Audience:** Monish, Ashif, Nitish, Darshan

---

## 1. Spec-Driven Development (SDD) Workflow

Project Passport follows a strict sequential SDD methodology:

```
  ┌─────────────┐
  │ 1. Specify  │ ──► Define spec.md with functional requirement IDs & acceptance criteria
  └──────┬──────┘
         ▼
  ┌─────────────┐
  │   2. Plan   │ ──► Author plan.md detailing interfaces, architecture & file changes
  └──────┬──────┘
         ▼
  ┌─────────────┐
  │  3. Tasks   │ ──► Create ordered tasks.md with assignees & definitions of done
  └──────┬──────┘
         ▼
  ┌─────────────┐
  │ 4. Approve  │ ──► Tech Lead (Monish) reviews and signs off before coding starts
  └──────┬──────┘
         ▼
  ┌─────────────┐
  │5. Implement │ ──► Write code strictly within designated module boundaries
  └──────┬──────┘
         ▼
  ┌─────────────┐
  │  6. Verify  │ ──► Run npm run verify (compilation, lint, format, tests, SDD check)
  └──────┬──────┘
         ▼
  ┌─────────────┐
  │  7. Review  │ ──► GitHub PR peer review with SDD verification checklist
  └──────┬──────┘
         ▼
  ┌─────────────┐
  │ 8. Handover │ ──► Record actual results in acceptance.md and sign off docs/HANDOVER.md
  └─────────────┘
```

---

## 2. Phase File Ownership Rules

- Developers must edit code only within their assigned module directories.
- To request an interface change, open an issue using `.github/ISSUE_TEMPLATE/feature_request.md`.
- No new directories may be created under `src/` without an approved specification update.

---

## 3. Daily Commands

```bash
# Verify environment readiness
npm run check-env

# Validate SDD phase artifacts
npm run validate:sdd

# Compile TypeScript
npm run compile

# Build extension bundle
npm run build

# Start incremental watch build
npm run watch

# Run automated tests
npm run test

# Check code formatting and linting
npm run lint
npm run format:check

# Run complete verification suite
npm run verify
```
