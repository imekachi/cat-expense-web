import { nanoid } from 'nanoid'
import * as React from 'react'
import { CAT_EXPENSE_FIXTURES } from '@/domain/catExpense'
import { Button } from '@/lib/design-system/Button'
import { dollarsToCents } from '@/lib/utils/currencyUnit'
import { AddExpenseButton, AddExpenseButtonProps } from './AddExpenseButton'
import { CatExpenseTable } from './CatExpenseTable'

export function CatExpensePage() {
  const [expenses, setExpenses] = React.useState(CAT_EXPENSE_FIXTURES)

  const handleAddExpense: AddExpenseButtonProps['onSubmit'] = (values) => {
    setExpenses((prevExpenses) => [
      // Add to the beginning of the list
      { ...values, id: nanoid(), amount: dollarsToCents(values.amount) },
      ...prevExpenses,
    ])
  }

  return (
    <main className="p-6">
      <h1 className="mb-8 text-center text-2xl font-bold">Cat Expense Web</h1>

      <div className="my-6 flex items-center justify-start gap-4">
        <AddExpenseButton onSubmit={handleAddExpense} />
        <Button variant="outline">Delete Expense</Button>
      </div>

      <div>
        <CatExpenseTable expenses={expenses} />
      </div>
    </main>
  )
}
