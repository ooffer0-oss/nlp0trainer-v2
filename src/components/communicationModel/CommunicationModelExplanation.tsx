import type { CommunicationModelResult } from '@/lib/validation/communicationModel'

interface CommunicationModelExplanationProps {
  feedback: CommunicationModelResult
}

export function CommunicationModelExplanation({
  feedback,
}: CommunicationModelExplanationProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          ניתוח מקצועי
        </h3>
        <span className="text-sm font-medium text-slate-400 dark:text-slate-500">
          {feedback.score} מתוך {feedback.total} נכונים
        </span>
      </div>

      <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
        {feedback.components.map((component) => (
          <div key={component.key} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  component.isCorrect ? 'bg-blue-600' : 'bg-slate-400'
                }`}
              >
                {component.isCorrect ? '✓' : '!'}
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-100">
                {component.label}
              </span>
            </div>

            {!component.isCorrect && component.selectedText && (
              <p className="text-sm text-slate-400 dark:text-slate-500">
                מה שנבחר: {component.selectedText}
              </p>
            )}

            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-medium">התשובה: </span>
              {component.correctText}
            </p>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {component.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
