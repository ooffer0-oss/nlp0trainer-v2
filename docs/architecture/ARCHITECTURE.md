# Architecture

Status: **Practitioner Pilot v1**. One real training module (Communication
Model) with rule-based validation is implemented end-to-end. Everything
else named in the founder spec (Patient Simulator, general Evaluation
Engine, Supervision Engine, Progress Engine, AI evaluation, Master
Practitioner features, etc.) is explicitly out of scope — see
`DECISIONS.md` #10.

## Stack

| Concern      | Choice                | Notes |
|--------------|------------------------|-------|
| UI framework | React 19               | Function components + hooks only |
| Language     | TypeScript             | `strict`-family checks on via Vite's template (`noUnusedLocals`, etc.) |
| Build tool   | Vite 8                 | `@vitejs/plugin-react` (Babel-based fast refresh) |
| State        | XState 5 + `@xstate/react` | `setup()` API; one shared session-lifecycle machine, reused across modules |
| Styling      | Tailwind CSS 4         | `@tailwindcss/vite` plugin, CSS-first config (no `tailwind.config.js`) |
| Language/direction | Hebrew, `dir="rtl"` (`index.html`) | All content and target users are Hebrew-speaking |

## Directory layout

```
src/
├── main.tsx                 # React root, mounts <App />
├── App.tsx                  # Toggles Home / Communication Model training screen
├── index.css                # Tailwind entry (`@import "tailwindcss"`)
├── components/
│   ├── layout/               # Page chrome, not feature-specific
│   │   ├── AppShell.tsx      # max-w-900px centered shell + Header
│   │   └── Header.tsx
│   ├── home/
│   │   └── HomeScreen.tsx    # Logo, title, description, "Start Practice"
│   ├── training/              # Shared, module-agnostic training framework
│   │   ├── ExerciseTrainer.tsx  # Drives sessionMachine; generic over exercise/answer/feedback types
│   │   └── ExerciseCard.tsx     # Shared prompt/scenario display card
│   └── communicationModel/    # First concrete module
│       ├── CommunicationModelTrainerScreen.tsx
│       ├── CommunicationModelAnswerArea.tsx
│       └── CommunicationModelExplanation.tsx
├── content/
│   └── communicationModel/
│       ├── types.ts          # Exercise/component/option/answer types
│       └── exercises.ts      # Structured exercise data (sample, unreviewed)
├── lib/
│   └── validation/
│       └── communicationModel.ts  # Pure rule-based scoring function
└── machines/
    └── session/
        ├── sessionMachine.ts        # Shared lifecycle machine
        ├── sessionMachine.types.ts  # Context/event contracts
        └── index.ts
```

## Session state machine

`src/machines/session/sessionMachine.ts` models the lifecycle shape of a
training session and is **reused as-is** by the Communication Model
module — no module-specific machine was created, because the generic
shape already matched:

```
idle
 └─ START_SESSION ─▶ active
                       ├─ presentingPrompt  ─ PROMPT_READY ────▶ awaitingResponse
                       ├─ awaitingResponse  ─ SUBMIT_RESPONSE ─▶ evaluatingResponse
                       ├─ evaluatingResponse ─ EVALUATION_COMPLETE ▶ showingFeedback
                       └─ showingFeedback   ─ NEXT_PROMPT ─────▶ presentingPrompt (loop)
     (from any `active.*` substate)
       PAUSE ──▶ paused ── RESUME ──▶ active (resumes at last substate)
       END_SESSION ──▶ completed
       FAIL ──▶ aborted
completed / aborted
 └─ RESET ─▶ idle
```

`SessionPrompt.payload` / `SessionResponse.payload` / `SessionFeedback.payload`
stay typed as `unknown` at the machine level — each module casts to its own
concrete types at the single boundary point inside `ExerciseTrainer`.

## Reusable training framework

`src/components/training/ExerciseTrainer.tsx` is a generic component
(`<TExercise, TAnswer, TFeedback>`) that:

1. Auto-starts the session machine on mount.
2. Feeds the current exercise into `PROMPT_READY` as `promptIndex` advances.
3. Renders `renderPrompt` + `renderAnswerArea` while awaiting a response.
4. On submit, dispatches `SUBMIT_RESPONSE`, then synchronously calls the
   module's `validate(exercise, answer)` and dispatches
   `EVALUATION_COMPLETE`.
5. Renders `renderExplanation` + a "next exercise" action.
6. Shows a completion screen (with restart) once `exercises` is exhausted.

A new module (Meta Model, Milton Model, Presuppositions, ...) needs only:
its own exercise data + types, a `validate` function, and the three
render props. `ExerciseTrainer` and `sessionMachine` do not change.

## Communication Model module (implemented)

The learner reads a short scenario and, for each of five components
(Event / Internal Representation / State / Behavior / Result), picks the
matching sentence from a multiple-choice list (Decision #11 — chosen over
free-text segment-matching or open-ended writing, to keep validation
rule-based). `src/lib/validation/communicationModel.ts` does a plain
string-equality check per component — no AI, no fuzzy matching.

The three sample exercises in `exercises.ts` are illustrative content
written to exercise the mechanism end-to-end and have **not** been
reviewed by an NLP instructor.

## Styling approach

Tailwind CSS 4 via `@tailwindcss/vite` (no `tailwind.config.js`). Visual
language follows the founder spec: rounded-2xl cards, soft shadows,
neutral slate palette, blue-600 as the sole accent, generous whitespace,
desktop-first centered layout capped at 900px (`AppShell`). No
gamification/quiz visual language (no bright colors, badges-as-game,
progress bars beyond a plain "X of Y" label).

## Path aliases

`@/*` maps to `src/*`, configured in both `vite.config.ts` (resolver) and
`tsconfig.app.json` (`compilerOptions.paths`).

## Explicitly out of scope for Pilot v1

Per the founder spec (see `DECISIONS.md` #10): Patient Simulator, general
Evaluation Engine, Supervision Engine, Recognition Engine, Progress
Engine, Adaptive Learning, User Analytics, Gamification, Master
Practitioner features, Certification, AI Session Simulation. Also still
out of scope: persistence of any kind, a real router, authentication,
and a test runner — see `OPEN_QUESTIONS.md`.
