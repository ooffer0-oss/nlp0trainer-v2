import { useEffect, useState, type ReactNode } from 'react'
import { useMachine } from '@xstate/react'
import { sessionMachine } from '@/machines/session'

interface ExerciseTrainerProps<TExercise, TAnswer, TFeedback> {
  exercises: TExercise[]
  emptyAnswer: TAnswer
  validate: (exercise: TExercise, answer: TAnswer) => TFeedback
  renderPrompt: (exercise: TExercise) => ReactNode
  renderAnswerArea: (props: {
    exercise: TExercise
    value: TAnswer
    onChange: (value: TAnswer) => void
  }) => ReactNode
  renderExplanation: (props: {
    exercise: TExercise
    answer: TAnswer
    feedback: TFeedback
  }) => ReactNode
}

/**
 * Generic training-session framework: drives the shared `sessionMachine`
 * lifecycle (presentingPrompt → awaitingResponse → evaluatingResponse →
 * showingFeedback → next) against any exercise/answer/feedback shape.
 *
 * A new training module (Presuppositions, Meta Model, ...) only needs its
 * own exercise data + `validate` + three render props — this component
 * does not change.
 */
export function ExerciseTrainer<TExercise, TAnswer, TFeedback>({
  exercises,
  emptyAnswer,
  validate,
  renderPrompt,
  renderAnswerArea,
  renderExplanation,
}: ExerciseTrainerProps<TExercise, TAnswer, TFeedback>) {
  const [state, send] = useMachine(sessionMachine)
  const [draftAnswer, setDraftAnswer] = useState<TAnswer>(emptyAnswer)
  const { promptIndex } = state.context

  useEffect(() => {
    if (state.matches('idle')) {
      send({ type: 'START_SESSION' })
    }
  }, [state, send])

  useEffect(() => {
    if (state.matches({ active: 'presentingPrompt' })) {
      const exercise = exercises[promptIndex]
      if (exercise) {
        send({
          type: 'PROMPT_READY',
          prompt: { id: String(promptIndex), payload: exercise },
        })
      } else {
        send({ type: 'END_SESSION' })
      }
    }
  }, [state, send, exercises, promptIndex])

  useEffect(() => {
    if (state.matches({ active: 'evaluatingResponse' })) {
      const exercise = state.context.currentPrompt?.payload as TExercise
      const answer = state.context.lastResponse?.payload as TAnswer
      send({
        type: 'EVALUATION_COMPLETE',
        feedback: { payload: validate(exercise, answer) },
      })
    }
  }, [state, send, validate])

  useEffect(() => {
    setDraftAnswer(emptyAnswer)
    // Intentionally re-runs only when the exercise changes, not on every
    // render — `emptyAnswer` is typically a fresh literal from the caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptIndex])

  if (state.matches('completed')) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          כל הכבוד — סיימת את התרגילים
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          אפשר לתרגל שוב מההתחלה בכל רגע.
        </p>
        <button
          type="button"
          onClick={() => send({ type: 'RESET' })}
          className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
        >
          תרגל שוב
        </button>
      </div>
    )
  }

  const isAnswering =
    state.matches({ active: 'awaitingResponse' }) ||
    state.matches({ active: 'evaluatingResponse' })

  if (isAnswering) {
    const exercise = state.context.currentPrompt?.payload as TExercise
    return (
      <div className="flex flex-col gap-6">
        <ProgressLabel index={promptIndex} total={exercises.length} />
        {renderPrompt(exercise)}
        {renderAnswerArea({
          exercise,
          value: draftAnswer,
          onChange: setDraftAnswer,
        })}
        <button
          type="button"
          onClick={() =>
            send({
              type: 'SUBMIT_RESPONSE',
              response: { payload: draftAnswer, submittedAt: Date.now() },
            })
          }
          disabled={state.matches({ active: 'evaluatingResponse' })}
          className="self-start rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          שלח תשובה
        </button>
      </div>
    )
  }

  if (state.matches({ active: 'showingFeedback' })) {
    const exercise = state.context.currentPrompt?.payload as TExercise
    const answer = state.context.lastResponse?.payload as TAnswer
    const feedback = state.context.lastFeedback?.payload as TFeedback
    return (
      <div className="flex flex-col gap-6">
        <ProgressLabel index={promptIndex} total={exercises.length} />
        {renderExplanation({ exercise, answer, feedback })}
        <button
          type="button"
          onClick={() => send({ type: 'NEXT_PROMPT' })}
          className="self-start rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-blue-700"
        >
          תרגיל הבא
        </button>
      </div>
    )
  }

  return null
}

function ProgressLabel({ index, total }: { index: number; total: number }) {
  return (
    <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
      תרגיל {Math.min(index + 1, total)} מתוך {total}
    </span>
  )
}
