/**
 * Type contracts for the session state machine.
 *
 * This file defines shape only — no business logic, no NLP/AI evaluation.
 * Fields are placeholders for future domain modeling and are intentionally
 * loose (`unknown`) until the exercise/evaluation domain is designed.
 */

export interface SessionPrompt {
  id: string
  /** Placeholder — exercise payload shape is not yet designed. */
  payload: unknown
}

export interface SessionResponse {
  /** Placeholder — learner response payload shape is not yet designed. */
  payload: unknown
  submittedAt: number
}

export interface SessionFeedback {
  /** Placeholder — evaluation/feedback payload shape is not yet designed. */
  payload: unknown
}

export interface SessionContext {
  sessionId: string | null
  currentPrompt: SessionPrompt | null
  lastResponse: SessionResponse | null
  lastFeedback: SessionFeedback | null
  promptIndex: number
  error: string | null
}

export type SessionEvent =
  | { type: 'START_SESSION' }
  | { type: 'PROMPT_READY'; prompt: SessionPrompt }
  | { type: 'SUBMIT_RESPONSE'; response: SessionResponse }
  | { type: 'EVALUATION_COMPLETE'; feedback: SessionFeedback }
  | { type: 'NEXT_PROMPT' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'END_SESSION' }
  | { type: 'RESET' }
  | { type: 'FAIL'; error: string }
