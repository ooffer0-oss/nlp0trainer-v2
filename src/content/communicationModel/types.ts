/**
 * Structured content types for the Communication Model training module.
 * No UI text is hardcoded in components — everything a learner reads
 * (scenario, option text, explanations) lives in exercise data.
 */

export type CommunicationModelComponentKey =
  | 'event'
  | 'internalRepresentation'
  | 'state'
  | 'behavior'
  | 'result'

export interface CommunicationModelOption {
  id: string
  text: string
}

export interface CommunicationModelComponentSpec {
  key: CommunicationModelComponentKey
  label: string
  options: CommunicationModelOption[]
  correctOptionId: string
  explanation: string
}

export interface CommunicationModelExercise {
  id: string
  title: string
  scenario: string
  difficulty?: 'easy' | 'medium' | 'hard'
  components: CommunicationModelComponentSpec[]
}

/** Learner's selected option id per component key. */
export type CommunicationModelAnswer = Partial<
  Record<CommunicationModelComponentKey, string>
>
