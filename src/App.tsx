import { useAppStore, selectView } from './store/appSlice'
import MonsterManual from './components/MonsterManual'
import EncounterView from './components/EncounterView'

export default function App() {
  const view = useAppStore(selectView)
  return view === 'encounter' ? <EncounterView /> : <MonsterManual />
}
