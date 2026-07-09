import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { HomeScreen } from '@/components/home/HomeScreen'
import { CommunicationModelTrainerScreen } from '@/components/communicationModel/CommunicationModelTrainerScreen'

type View = 'home' | 'training'

function App() {
  const [view, setView] = useState<View>('home')

  if (view === 'home') {
    return <HomeScreen onStart={() => setView('training')} />
  }

  return (
    <AppShell>
      <CommunicationModelTrainerScreen />
    </AppShell>
  )
}

export default App
