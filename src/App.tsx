import { QueryClient, QueryClientProvider } from 'react-query'
import { CatExpensePage } from '@/pages/CatExpensePage'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CatExpensePage />
    </QueryClientProvider>
  )
}

export default App
