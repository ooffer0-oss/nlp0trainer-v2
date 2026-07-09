interface HomeScreenProps {
  onStart: () => void
}

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-white px-6 text-center dark:bg-slate-950">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-semibold text-white">
        N
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
          NLP Trainer
        </h1>
        <p className="max-w-md text-slate-500 dark:text-slate-400">
          כלי תרגול מקצועי למתרגלי NLP — תרגילים קצרים עם ניתוח והסבר לאחר כל
          תשובה.
        </p>
      </div>
      <button
        type="button"
        onClick={onStart}
        className="mt-2 rounded-xl bg-blue-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700"
      >
        Start Practice
      </button>
    </div>
  )
}
