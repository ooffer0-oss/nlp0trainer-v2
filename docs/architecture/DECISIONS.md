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
| 11 | **Multiple choice is the answer type of the Communication Model exercise only — not an architectural commitment.** Other exercise types (drag & drop, text highlight, free text, matching, ordering) must be addable later without touching the core | Explicitly reviewed: multiple choice is the first interaction pattern shipped, chosen for pilot speed, not a constraint imposed on the framework | Locked |
| 12 | Framework is split into three layers, verified to have zero cross-coupling: **Exercise Engine** (`sessionMachine.ts` + `ExerciseTrainer.tsx` — lifecycle only, no knowledge of any answer shape), **Answer Renderer** (the `renderAnswerArea`/`renderPrompt`/`renderExplanation` render props — module-supplied UI), **Validation Strategy** (the `validate` function prop — module-supplied logic). A new module adds only its own Answer Renderer + Validation Strategy + data; the Exercise Engine does not change | Verified by inspection (2nd review pass): grepped `sessionMachine.ts`/`.types.ts`/`ExerciseTrainer.tsx`/`ExerciseCard.tsx` for any answer-shape-specific term (`option`, `multiple choice`, etc.) — zero matches. `TAnswer` is fully opaque to the engine | Locked |
| 13 | UI language/direction: **Hebrew, `dir="rtl"`** on the document | All exercise content and the target users are Hebrew-speaking; resolves open question on i18n/RTL | Locked |
| 14 | **Pilot v1 review gate**: no further training modules (Meta Model, Milton Model, Presuppositions, Extended Change Model, core beliefs) start until this first module's architecture + UX is explicitly reviewed and approved | Matches the original "small, focused validation pilot" framing — one module fully validated before expanding | Locked — currently in this gate |

## Non-decisions (explicitly not yet made)

See `OPEN_QUESTIONS.md` — anything not listed above (routing beyond the
current home/training toggle, backend/API shape, persistence, evaluation
approach for open-ended exercises, component library beyond raw Tailwind,
testing framework, deployment target, Master Practitioner flow) has
**not** been decided and should not be assumed.
