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
| 9 | No business logic, NLP processing, or AI evaluation in this phase | Explicit task constraint | **Superseded by #10** — bootstrap-only phase ended |
| 10 | **Practitioner Pilot v1 scope**: implement only the Communication Model training module, with rule-based (non-AI) validation. Explicitly out of scope: Patient Simulator, general Evaluation Engine, Supervision Engine, Recognition Engine, Progress Engine, Adaptive Learning, User Analytics, Gamification, Master Practitioner features, Certification, AI Session Simulation | Per "NLP Trainer – Practitioner Pilot v1" founder spec — validate the learning experience before investing in the full platform | Locked |
| 11 | Answer mechanic for closed-ended exercises (Communication Model): **multiple choice per component**, not free-text and not segment-matching | User's explicit choice — simplest to build correctly, matches "frictionless" pilot goal, stays rule-based | Locked for this exercise shape; other shapes (e.g. open-ended belief reframing) are separately open — see `OPEN_QUESTIONS.md` |
| 12 | Reusable training framework = one shared `sessionMachine` (generic lifecycle) + one generic `ExerciseTrainer` component (`src/components/training/`), parameterized per module via `renderPrompt` / `renderAnswerArea` / `renderExplanation` / `validate`. New modules add only exercise data + these four things — the framework itself does not change | Matches spec's "Each module should reuse the same training framework. Only the exercise data should change" | Locked |
| 13 | UI language/direction: **Hebrew, `dir="rtl"`** on the document | All exercise content and the target users are Hebrew-speaking; resolves open question on i18n/RTL | Locked |

## Non-decisions (explicitly not yet made)

See `OPEN_QUESTIONS.md` — anything not listed above (routing beyond the
current home/training toggle, backend/API shape, persistence, evaluation
approach for open-ended exercises, component library beyond raw Tailwind,
testing framework, deployment target, Master Practitioner flow) has
**not** been decided and should not be assumed.
