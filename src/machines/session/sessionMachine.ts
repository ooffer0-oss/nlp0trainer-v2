import { assign, setup } from 'xstate'
import type { SessionContext, SessionEvent } from './sessionMachine.types'

/**
 * Session state machine — STRUCTURAL SKELETON ONLY.
 *
 * This machine defines the lifecycle shape of a training session
 * (idle → active → paused/completed/aborted). It intentionally contains
 * NO business logic, NO NLP evaluation, and NO AI grading.
 *
 * `evaluatingResponse` is a placeholder state: in this skeleton it is
 * reached and left via explicit events only. Wiring it to a real
 * evaluation service is out of scope for the bootstrap task.
 */

const initialContext: SessionContext = {
  sessionId: null,
  currentPrompt: null,
  lastResponse: null,
  lastFeedback: null,
  promptIndex: 0,
  error: null,
}

export const sessionMachine = setup({
  types: {
    context: {} as SessionContext,
    events: {} as SessionEvent,
  },
  actions: {
    // TODO: replace with a real session id strategy.
    assignNewSession: assign({
      sessionId: () => `session-placeholder-${Date.now()}`,
      promptIndex: 0,
      lastResponse: null,
      lastFeedback: null,
      error: null,
    }),
    assignPrompt: assign({
      currentPrompt: ({ event }) => {
        if (event.type !== 'PROMPT_READY') return null
        return event.prompt
      },
    }),
    assignResponse: assign({
      lastResponse: ({ event }) => {
        if (event.type !== 'SUBMIT_RESPONSE') return null
        return event.response
      },
    }),
    assignFeedback: assign({
      lastFeedback: ({ event }) => {
        if (event.type !== 'EVALUATION_COMPLETE') return null
        return event.feedback
      },
    }),
    incrementPromptIndex: assign({
      promptIndex: ({ context }) => context.promptIndex + 1,
    }),
    assignError: assign({
      error: ({ event }) => (event.type === 'FAIL' ? event.error : null),
    }),
    resetContext: assign(() => initialContext),
  },
}).createMachine({
  id: 'session',
  context: initialContext,
  initial: 'idle',
  states: {
    idle: {
      on: {
        START_SESSION: {
          target: 'active',
          actions: 'assignNewSession',
        },
      },
    },
    active: {
      initial: 'presentingPrompt',
      on: {
        PAUSE: 'paused',
        END_SESSION: 'completed',
        FAIL: { target: 'aborted', actions: 'assignError' },
      },
      states: {
        presentingPrompt: {
          on: {
            PROMPT_READY: {
              target: 'awaitingResponse',
              actions: 'assignPrompt',
            },
          },
        },
        awaitingResponse: {
          on: {
            SUBMIT_RESPONSE: {
              target: 'evaluatingResponse',
              actions: 'assignResponse',
            },
          },
        },
        evaluatingResponse: {
          // Placeholder only — no evaluation/NLP/AI logic wired up here.
          on: {
            EVALUATION_COMPLETE: {
              target: 'showingFeedback',
              actions: 'assignFeedback',
            },
          },
        },
        showingFeedback: {
          on: {
            NEXT_PROMPT: {
              target: 'presentingPrompt',
              actions: 'incrementPromptIndex',
            },
          },
        },
      },
    },
    paused: {
      on: {
        RESUME: 'active',
        END_SESSION: 'completed',
      },
    },
    completed: {
      on: {
        RESET: {
          target: 'idle',
          actions: 'resetContext',
        },
      },
    },
    aborted: {
      on: {
        RESET: {
          target: 'idle',
          actions: 'resetContext',
        },
      },
    },
  },
})
