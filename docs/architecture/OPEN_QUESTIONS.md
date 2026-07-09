# Open Questions

Unresolved decisions deferred past the current phase. Nothing here should
be assumed or silently decided by later code — resolve explicitly and
move the item to `DECISIONS.md` when settled.

## Resolved (moved to DECISIONS.md, kept here as pointers)

- ~~Exercise/prompt data model~~ — resolved **for the Communication Model
  module only** (`CommunicationModelExercise` in
  `src/content/communicationModel/types.ts`). Other modules (Meta Model,
  Milton Model, Presuppositions, Extended Change Model) still need their
  own data shape designed.
- ~~Response capture model~~ — resolved **for closed-ended exercises**:
  multiple choice per component (Decision #11). Open-ended response types
  (e.g. free-text belief reframing) are still undecided — pending input
  from the user's instructor.
- ~~Evaluation/feedback approach~~ — resolved **for closed-ended
  exercises**: rule-based comparison, no AI (Decision #10/#12). Open-ended
  exercises would need a different approach (LLM + rubric), explicitly
  out of scope for Pilot v1.
- ~~Internationalization~~ — resolved: Hebrew, `dir="rtl"` (Decision #13).

## Still open

1. **Additional module content models** — Meta Model, Milton Model,
   Presuppositions, Extended Change Model, Representational Systems were
   named as future modules. Only Communication Model has been built.
   Presuppositions looks closed-ended (reuse today's pattern); Extended
   Change Model's exercise interaction was never specified; the "core
   beliefs" idea is open-ended and still pending the user's instructor.
2. **Backend/API layer** — still fully client-side; no backend exists.
3. **Persistence** — no progress/history is saved anywhere (not even
   local storage). Pilot v1's success criteria don't require it, but a
   real rollout will.
4. **Routing** — still just a two-way `useState` toggle in `App.tsx`
   (home/training). Fine for one module; will need a real router once
   multiple training modules exist side by side.
5. **Authentication** — out of scope entirely; no user/account model.
6. **Component library** — still raw Tailwind utility classes only.
7. **Testing strategy** — no test runner installed (Vitest would be the
   natural fit given Vite).
8. **Multiple state machines / actor hierarchy** — the Master
   Practitioner flow (full guided session with a human supervisor) was
   already flagged as needing its own machine/module rather than reusing
   `sessionMachine` — still unbuilt and unscoped.
9. **Deployment target** — static hosting, containerized, etc. — undecided.
10. **Native app** — decided to build web-only for now (responsive/PWA);
    revisit only if browser feedback from real students surfaces a real
    gap.
11. **`validate` is synchronous-only** (`ExerciseTrainer`'s `validate:
    (exercise, answer) => TFeedback`). This is fine for every closed-ended
    answer type on the roadmap (multiple choice, drag & drop, text
    highlight, matching, ordering — all can be scored by a pure sync
    function). It will **not** be fine for a Free Text answer type
    evaluated by an LLM, which needs to be async. Not fixing this
    pre-emptively — flagging it so the signature change (`TFeedback |
    Promise<TFeedback>`) is a known, deliberate step when Free Text is
    actually built, not a surprise refactor.
