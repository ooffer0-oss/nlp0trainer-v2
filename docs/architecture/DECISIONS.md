# Architectural Decisions (Locked)

Decisions recorded here are considered settled for the current phase of the
project. Changing a locked decision should be a deliberate, visible act
(new entry superseding the old one), not a silent drift.

| # | Decision | Rationale | Status |
|---|----------|-----------|--------|
| 1 | Frontend framework: **React 19** (function components + hooks) | Required by task spec | Locked |
| 2 | Language: **TypeScript**, strict-leaning template settings (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`) | Required by task spec; catches drift early | Locked |
| 3 | Build tool: **Vite 8** (`@vitejs/plugin-react`) | Required by task spec | Locked |
| 4 | State management for session flow: **XState 5**, using the `setup()` machine API and `@xstate/react`'s `useMachine` | Required by task spec; v5 `setup()` is the current idiomatic API | Locked |
| 5 | Styling: **Tailwind CSS 4** via the `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.js`) | Required by task spec; v4's Vite plugin is the current recommended integration | Locked |
| 6 | Package manager: **npm** (`package-lock.json`) | Matches existing repo tooling assumptions; no lockfile/PM preference stated otherwise | Locked |
| 7 | Import alias `@/*` → `src/*` | Keeps deep imports readable as the tree grows; configured symmetrically in Vite and TypeScript | Locked |
| 8 | One state machine per session concept (`sessionMachine`), scoped under `src/machines/session/` | Establishes the pattern for future machines (one folder per domain machine, colocated types) | Locked |
| 9 | No business logic, NLP processing, or AI evaluation in this phase | Explicit task constraint | Locked for this phase — revisit once feature work begins |

## Non-decisions (explicitly not yet made)

See `OPEN_QUESTIONS.md` — anything not listed above (routing, backend/API
shape, persistence, exercise/prompt data model, evaluation approach,
component library beyond raw Tailwind, testing framework, deployment
target) has **not** been decided and should not be assumed.
