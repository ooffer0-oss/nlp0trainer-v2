import { useMachine } from '@xstate/react'
import { sessionMachine } from '@/machines/session'
import { PromptPanel } from './PromptPanel'
import { ResponseInput } from './ResponseInput'
import { FeedbackPanel } from './FeedbackPanel'

/**
 * Wires the session state machine skeleton to placeholder UI.
 * Only drives START_SESSION/END_SESSION to demonstrate the lifecycle
 * shape — no exercise data, no evaluation logic.
 */
export function SessionScreen() {
  const [state, send] = useMachine(sessionMachine)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
        <span className="text-slate-500 dark:text-slate-400">
          Session state:{' '}
          <span className="font-mono text-slate-900 dark:text-slate-100">
            {JSON.stringify(state.value)}
          </span>
        </span>
        {state.matches('idle') && (
          <button
            type="button"
            onClick={() => send({ type: 'START_SESSION' })}
            className="rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Start session
          </button>
        )}
        {!state.matches('idle') && !state.matches('completed') && !state.matches('aborted') && (
          <button
            type="button"
            onClick={() => send({ type: 'END_SESSION' })}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            End session
          </button>
        )}
        {(state.matches('completed') || state.matches('aborted')) && (
          <button
            type="button"
            onClick={() => send({ type: 'RESET' })}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Reset
          </button>
        )}
      </div>

      <PromptPanel />
      <ResponseInput />
      <FeedbackPanel />
    </div>
  )
}
