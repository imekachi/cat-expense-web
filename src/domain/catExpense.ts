export type CatExpenseCategory = {
  id: string
  title: string
}

export const CAT_EXPENSE_CATEGORIES: CatExpenseCategory[] = [
  {
    id: 'category-id-1',
    title: 'Food',
  },
  {
    id: 'category-id-2',
    title: 'Furniture',
  },
  {
    id: 'category-id-3',
    title: 'Accessory',
  },
]

export const CAT_EXPENSE_CATEGORY_BY_ID: Record<
  CatExpenseCategory['id'],
  CatExpenseCategory
> = Object.fromEntries(
  CAT_EXPENSE_CATEGORIES.map((category) => [category.id, category]),
)

export type CatExpense = {
  id: string
  title: string
  categoryId: string
  /**
   * In cents to avoid floating point errors
   */
  amount: number
}

export const CAT_EXPENSE_FIXTURES: CatExpense[] = [
  {
    id: 'expense-id-1',
    title: 'Whiskers Cat food',
    categoryId: 'category-id-1',
    amount: 1000,
  },
  {
    id: 'expense-id-2',
    title: 'Self cleaning cat litter box',
    categoryId: 'category-id-2',
    amount: 50000,
  },
  {
    id: 'expense-id-3',
    title: 'Diamond Cat collar',
    categoryId: 'category-id-3',
    amount: 100000,
  },
]
