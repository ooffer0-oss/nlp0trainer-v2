import type { ReactNode } from 'react'

interface ExerciseCardProps {
  title: string
  difficulty?: ReactNode
  children: ReactNode
}

/**
 * Shared presentational card for showing an exercise's prompt/scenario.
 * Used by each module's `renderPrompt` implementation — content stays
 * module-specific, only the card chrome is shared.
 */
export function ExerciseCard({ title, difficulty, children }: ExerciseCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        {difficulty && (
          <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {difficulty}
          </span>
        )}
      </div>
      <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
        {children}
      </p>
    </div>
  )
}
