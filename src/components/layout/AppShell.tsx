import type { ReactNode } from 'react'
import { Header } from './Header'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-svh flex-col bg-white dark:bg-slate-950">
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
        {children}
      </main>
    </div>
  )
}
