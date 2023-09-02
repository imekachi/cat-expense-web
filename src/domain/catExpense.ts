export type CatExpenseCategory = {
  id: string
  name: string
}

export const CAT_EXPENSE_CATEGORIES: CatExpenseCategory[] = [
  {
    id: 'category-id-1',
    name: 'Food',
  },
  {
    id: 'category-id-2',
    name: 'Furniture',
  },
  {
    id: 'category-id-3',
    name: 'Accessory',
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
  name: string
  categoryId: string
  /**
   * In cents to avoid floating point errors
   */
  amount: number
}

export const CAT_EXPENSE_FIXTURES: CatExpense[] = [
  {
    id: 'expense-id-1',
    name: 'Whiskers Cat food',
    categoryId: 'category-id-1',
    amount: 1000,
  },
  {
    id: 'expense-id-2',
    name: 'Self cleaning cat litter box',
    categoryId: 'category-id-2',
    amount: 50000,
  },
  {
    id: 'expense-id-3',
    name: 'Diamond Cat collar',
    categoryId: 'category-id-3',
    amount: 100000,
  },
]
