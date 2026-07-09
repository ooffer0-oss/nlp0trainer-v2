import type {
  CommunicationModelAnswer,
  CommunicationModelExercise,
} from '@/content/communicationModel/types'

interface CommunicationModelAnswerAreaProps {
  exercise: CommunicationModelExercise
  value: CommunicationModelAnswer
  onChange: (value: CommunicationModelAnswer) => void
}

export function CommunicationModelAnswerArea({
  exercise,
  value,
  onChange,
}: CommunicationModelAnswerAreaProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {exercise.components.map((component) => (
        <fieldset key={component.key} className="flex flex-col gap-3">
          <legend className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            {component.label}
          </legend>
          <div className="flex flex-col gap-2">
            {component.options.map((option) => {
              const isSelected = value[component.key] === option.id
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() =>
                    onChange({ ...value, [component.key]: option.id })
                  }
                  className={`rounded-xl border px-4 py-3 text-start text-sm transition-colors ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-100'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {option.text}
                </button>
              )
            })}
          </div>
        </fieldset>
      ))}
    </div>
  )
}
