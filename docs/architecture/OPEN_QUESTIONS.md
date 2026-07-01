# Open Questions

Unresolved decisions deferred past this bootstrap. Nothing here should be
assumed or silently decided by later code — resolve explicitly and move
the item to `DECISIONS.md` when settled.

1. **Exercise/prompt data model** — what does an NLP training prompt
   actually contain (text, audio, structured fields, difficulty, tags)?
   Currently `SessionPrompt.payload` is `unknown`.
2. **Response capture model** — text input, audio recording, multiple
   choice, or a mix? Currently `SessionResponse.payload` is `unknown`.
3. **Evaluation/feedback approach** — rule-based, AI/LLM-based, hybrid?
   Where does it run (client, server, third-party API)? Nothing is wired
   into `evaluatingResponse` yet — it's a pass-through placeholder state.
4. **Backend/API layer** — does this app talk to a backend at all in the
   MVP, or is it fully client-side to start?
5. **Persistence** — session history, progress, user profile: none exists
   yet. Local-only vs. server-backed is undecided.
6. **Routing** — single-screen app for now; no router installed. Add one
   (and which: React Router, TanStack Router, etc.) once multiple
   screens/routes are needed.
7. **Authentication** — out of scope entirely so far; no user/account
   model exists.
8. **Component library** — currently raw Tailwind utility classes only.
   Adopt a headless component library (Radix, Headless UI) or keep
   hand-rolled components?
9. **Testing strategy** — no test runner installed. Vitest is the natural
   fit given Vite, but not yet decided/added.
10. **Multiple state machines / actor hierarchy** — `sessionMachine` is
    the only machine. As features grow (e.g., per-exercise sub-machines,
    an evaluation-service actor), decide whether they become child actors
    of `sessionMachine` or separate top-level machines composed in React.
11. **Internationalization** — the task description is in Hebrew; is
    Hebrew/RTL a UI requirement, or was Hebrew only used for
    instructions? No i18n or RTL handling exists yet.
12. **Deployment target** — static hosting, containerized, etc. — undecided.
