import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import {
  CAT_EXPENSE_CATEGORY_BY_ID,
  CatExpense,
  CatExpenseCategory,
} from '@/domain/catExpense'
import { Button } from '@/lib/design-system/Button'
import { Checkbox } from '@/lib/design-system/Checkbox'
import { centsToDollars } from '@/lib/utils/currencyUnit'
import { formatCurrency } from '@/lib/utils/formatCurrency'

export const catExpenseColumns: ColumnDef<CatExpense>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Item',
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
    cell: ({ row }) => {
      const categoryId = row.getValue<CatExpenseCategory['id']>('categoryId')
      const category = CAT_EXPENSE_CATEGORY_BY_ID[categoryId]
      return <div>{category?.title ?? categoryId}</div>
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = row.getValue<number>('amount')
      // Format the amount as a dollar amount
      const formatted = formatCurrency(centsToDollars(amount))
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
]
