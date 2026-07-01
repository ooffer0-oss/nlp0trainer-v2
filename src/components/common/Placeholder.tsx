interface PlaceholderProps {
  label: string
  className?: string
}

/**
 * Generic "not implemented yet" block used to mark out UI regions
 * before their real content/logic is built.
 */
export function Placeholder({ label, className = '' }: PlaceholderProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 ${className}`}
    >
      {label}
    </div>
  )
}
