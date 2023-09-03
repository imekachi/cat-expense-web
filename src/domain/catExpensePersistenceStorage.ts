import { CatExpense } from '@/domain/catExpense'

export const catExpensesStorage = {
  key: 'catExpenses',
  read: (): CatExpense[] | undefined => {
    const catExpenses = localStorage.getItem(catExpensesStorage.key)
    return catExpenses ? JSON.parse(catExpenses) : undefined
  },
  write: (catExpenses: CatExpense[]) => {
    localStorage.setItem(catExpensesStorage.key, JSON.stringify(catExpenses))
  },
}
