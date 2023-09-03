import { RowSelectionState } from '@tanstack/react-table'
import { nanoid } from 'nanoid'
import * as React from 'react'
import { CAT_EXPENSE_FIXTURES } from '@/domain/catExpense'
import { catExpensesStorage } from '@/domain/catExpensePersistenceStorage'
import { Button } from '@/lib/design-system/Button'
import { dollarsToCents } from '@/lib/utils/currencyUnit'
import { isObjEmpty } from '@/lib/utils/isObjEmpty'
import { AddExpenseButton, AddExpenseButtonProps } from './AddExpenseButton'
import { CatExpenseTable } from './AddExpenseButton/CatExpenseTable'

export function CatExpensePage() {
  const [expenses, setExpenses] = React.useState(
    catExpensesStorage.read() ?? CAT_EXPENSE_FIXTURES,
  )
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const setExpensesAndPersist: typeof setExpenses = React.useCallback(
    (newExpenses) => {
      if (typeof newExpenses === 'function') {
        setExpenses((prevExpenses) => {
          const updatedExpenses = newExpenses(prevExpenses)
          catExpensesStorage.write(updatedExpenses)
          return updatedExpenses
        })
      } else {
        setExpenses(newExpenses)
        catExpensesStorage.write(newExpenses)
      }
    },
    [],
  )

  const handleAddExpense: AddExpenseButtonProps['onSubmitNewExpense'] = (
    values,
  ) => {
    setExpensesAndPersist((prevExpenses) => [
      // Add to the beginning of the list
      { ...values, id: nanoid(), amount: dollarsToCents(values.amount) },
      ...prevExpenses,
    ])
  }

  const handleDeleteExpense = () => {
    // Delete the selected rows
    setExpensesAndPersist((prevExpenses) =>
      prevExpenses.filter((_expense, index) => !rowSelection[index]),
    )
    // Reset the row selection
    setRowSelection({})
  }

  return (
    <main className="p-6">
      <h1 className="mb-8 text-center text-2xl font-bold">Cat Expense Web</h1>

      <div className="my-6 flex items-center justify-start gap-4">
        <AddExpenseButton onSubmitNewExpense={handleAddExpense} />
        <Button
          variant="outline"
          onClick={handleDeleteExpense}
          disabled={isObjEmpty(rowSelection)}
        >
          Delete Expense
        </Button>
      </div>

      <div>
        <CatExpenseTable
          expenses={expenses}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
        />
      </div>
    </main>
  )
}
