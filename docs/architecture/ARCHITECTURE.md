# Architecture — Bootstrap State

Status: **infrastructure only**. No business logic, no NLP features, no AI
evaluation exist in this codebase yet. This document describes the
scaffold created by the bootstrap task and will be extended as real
features land.

## Stack

| Concern      | Choice                | Notes |
|--------------|------------------------|-------|
| UI framework | React 19               | Function components + hooks only |
| Language     | TypeScript             | `strict`-family checks on via Vite's template (`noUnusedLocals`, etc.) |
| Build tool   | Vite 8                 | `@vitejs/plugin-react` (Babel-based fast refresh) |
| State        | XState 5 + `@xstate/react` | `setup()` API; session lifecycle only, no other machines yet |
| Styling      | Tailwind CSS 4         | `@tailwindcss/vite` plugin, CSS-first config (no `tailwind.config.js`) |

## Directory layout

```
src/
├── main.tsx                 # React root, mounts <App />
├── App.tsx                  # Composes AppShell + SessionScreen
├── index.css                # Tailwind entry (`@import "tailwindcss"`)
├── components/
│   ├── layout/               # Page chrome, not feature-specific
│   │   ├── AppShell.tsx
│   │   └── Header.tsx
│   ├── session/               # Session-screen placeholders
│   │   ├── SessionScreen.tsx  # Wires sessionMachine to placeholder panels
│   │   ├── PromptPanel.tsx    # Placeholder — exercise rendering TBD
│   │   ├── ResponseInput.tsx  # Placeholder — input capture TBD
│   │   └── FeedbackPanel.tsx  # Placeholder — evaluation display TBD
│   └── common/
│       └── Placeholder.tsx    # Reusable "not implemented" block
└── machines/
    └── session/
        ├── sessionMachine.ts        # State machine skeleton
        ├── sessionMachine.types.ts  # Context/event contracts
        └── index.ts                 # Public exports
```

`docs/architecture/` holds this document plus the decision and open-question
logs described below.

## Session state machine (skeleton)

`src/machines/session/sessionMachine.ts` models the **lifecycle shape** of a
training session — it does not implement any exercise content, response
validation, or evaluation logic.

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

Key points:

- `evaluatingResponse` is a **placeholder state**: the skeleton only defines
  how it's entered and exited via explicit events (`SUBMIT_RESPONSE` →
  `EVALUATION_COMPLETE`). No evaluation service, NLP call, or AI grading is
  wired in.
- Context (`SessionContext`) only tracks bookkeeping (session id, prompt
  index, last response/feedback references, error). Payload shapes
  (`SessionPrompt.payload`, `SessionResponse.payload`,
  `SessionFeedback.payload`) are `unknown` — deliberately undesigned.
- `SessionScreen.tsx` drives only `START_SESSION`/`END_SESSION`/`RESET` to
  demonstrate the lifecycle; it does not dispatch `PROMPT_READY`,
  `SUBMIT_RESPONSE`, or `EVALUATION_COMPLETE`, since those require real
  content/logic that hasn't been built.

## Styling approach

Tailwind CSS 4 is wired through the Vite plugin (`@tailwindcss/vite`), which
removes the need for a `postcss.config.js`/`tailwind.config.js` pair — theme
customization (when needed) will happen via `@theme` in `src/index.css`.
Components currently use only Tailwind utility classes; no custom design
tokens or component library have been chosen yet (see open questions).

## Path aliases

`@/*` maps to `src/*`, configured in both `vite.config.ts` (resolver) and
`tsconfig.app.json` (`compilerOptions.paths`), so editor and build resolve
imports identically.

## Explicitly out of scope for this bootstrap

- Any NLP/linguistic processing logic.
- Any AI/LLM evaluation or scoring.
- Persistence (local storage, backend, API layer).
- Routing (single implicit screen only, no router installed).
- Authentication/session-of-record concerns (the state machine's "session"
  is a training-session lifecycle, not an auth session).
- Test setup (no test runner installed yet).
