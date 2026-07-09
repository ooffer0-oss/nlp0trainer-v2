import type {
  CommunicationModelAnswer,
  CommunicationModelExercise,
} from '@/content/communicationModel/types'

export interface CommunicationModelComponentResult {
  key: string
  label: string
  isCorrect: boolean
  selectedOptionId: string | undefined
  selectedText: string | undefined
  correctText: string
  explanation: string
}

export interface CommunicationModelResult {
  score: number
  total: number
  components: CommunicationModelComponentResult[]
}

/** Pure rule-based scoring — compares selected option ids to each component's correct id. */
export function validateCommunicationModelAnswer(
  exercise: CommunicationModelExercise,
  answer: CommunicationModelAnswer,
): CommunicationModelResult {
  const components = exercise.components.map((component) => {
    const selectedOptionId = answer[component.key]
    const selectedOption = component.options.find(
      (option) => option.id === selectedOptionId,
    )
    const correctOption = component.options.find(
      (option) => option.id === component.correctOptionId,
    )

    return {
      key: component.key,
      label: component.label,
      isCorrect: selectedOptionId === component.correctOptionId,
      selectedOptionId,
      selectedText: selectedOption?.text,
      correctText: correctOption?.text ?? '',
      explanation: component.explanation,
    }
  })

  return {
    score: components.filter((component) => component.isCorrect).length,
    total: components.length,
    components,
  }
}
