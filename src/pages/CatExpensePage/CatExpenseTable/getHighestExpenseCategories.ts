import { CatExpense } from '@/domain/catExpense'

export function getHighestExpenseCategories(
  expenses: Pick<CatExpense, 'categoryId' | 'amount'>[],
): CatExpense['categoryId'][] {
  const totalExpenseByCategory = getTotalExpenseByCategory(expenses)
  const highestAmount = Math.max(...Object.values(totalExpenseByCategory))

  return Object.entries(totalExpenseByCategory)
    .filter(([, amount]) => amount === highestAmount)
    .map(([categoryId]) => categoryId)
}

function getTotalExpenseByCategory(
  expenses: Pick<CatExpense, 'categoryId' | 'amount'>[],
): Record<CatExpense['categoryId'], number> {
  const totalExpenseByCategory: Record<CatExpense['categoryId'], number> = {}

  expenses.forEach((expense) => {
    totalExpenseByCategory[expense.categoryId] =
      (totalExpenseByCategory[expense.categoryId] ?? 0) + expense.amount
  })

  return totalExpenseByCategory
}
