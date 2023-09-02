import { Button } from '@/lib/design-system/Button'
import { CatExpenseTable } from '@/pages/CatExpensePage/CatExpenseTable'

export function CatExpensePage() {
  return (
    <main className="p-6">
      <h1 className="mb-8 text-center text-2xl font-bold">Cat Expense Web</h1>

      <div className="my-6 flex items-center justify-start gap-4">
        <Button>Add Expense</Button>
        <Button>Delete Expense</Button>
      </div>

      <div>
        <CatExpenseTable />
      </div>
    </main>
  )
}
