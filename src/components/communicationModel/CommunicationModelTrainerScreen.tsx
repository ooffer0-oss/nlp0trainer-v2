import { ExerciseTrainer } from '@/components/training/ExerciseTrainer'
import { ExerciseCard } from '@/components/training/ExerciseCard'
import { communicationModelExercises } from '@/content/communicationModel/exercises'
import type {
  CommunicationModelAnswer,
  CommunicationModelExercise,
} from '@/content/communicationModel/types'
import {
  validateCommunicationModelAnswer,
  type CommunicationModelResult,
} from '@/lib/validation/communicationModel'
import { CommunicationModelAnswerArea } from './CommunicationModelAnswerArea'
import { CommunicationModelExplanation } from './CommunicationModelExplanation'

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'מתקדם',
}

export function CommunicationModelTrainerScreen() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          מודל התקשורת
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          קראו את הסיפור וזהו את חמשת הרכיבים של מודל התקשורת: אירוע, ייצוג
          פנימי, מצב, התנהגות ותוצאה.
        </p>
      </div>

      <ExerciseTrainer<
        CommunicationModelExercise,
        CommunicationModelAnswer,
        CommunicationModelResult
      >
        exercises={communicationModelExercises}
        emptyAnswer={{}}
        validate={validateCommunicationModelAnswer}
        renderPrompt={(exercise) => (
          <ExerciseCard
            title={exercise.title}
            difficulty={
              exercise.difficulty && DIFFICULTY_LABELS[exercise.difficulty]
            }
          >
            {exercise.scenario}
          </ExerciseCard>
        )}
        renderAnswerArea={({ exercise, value, onChange }) => (
          <CommunicationModelAnswerArea
            exercise={exercise}
            value={value}
            onChange={onChange}
          />
        )}
        renderExplanation={({ feedback }) => (
          <CommunicationModelExplanation feedback={feedback} />
        )}
      />
    </div>
  )
}
