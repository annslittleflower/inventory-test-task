import Inventory from './components/Inventory'
import InventoryProvider from '@/components/Inventory/hooks/useInventoryContext'

const App = () => {
  return (
    <InventoryProvider>
      <Inventory />
    </InventoryProvider>
  )
}

export default App
