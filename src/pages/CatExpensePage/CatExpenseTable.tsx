import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import * as React from 'react'
import {
  CAT_EXPENSE_CATEGORY_BY_ID,
  CatExpense,
  CatExpenseCategory,
} from '@/domain/catExpense'
import { Button } from '@/lib/design-system/Button'
import { Checkbox } from '@/lib/design-system/Checkbox'
import { DataTable, DataTableProps } from '@/lib/design-system/DataTable'
import { cn } from '@/lib/utils/cn'
import { centsToDollars } from '@/lib/utils/currencyUnit'
import { formatCurrency } from '@/lib/utils/formatCurrency'

const columns: ColumnDef<CatExpense>[] = [
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

const HIGHTEST_EXPENSES_CLASSNAME = 'bg-amber-100/50'

export type CatExpenseTableProps = {
  expenses: CatExpense[]
  rowSelection: RowSelectionState
  onRowSelectionChange: OnChangeFn<RowSelectionState>
}

export function CatExpenseTable({
  expenses,
  rowSelection,
  onRowSelectionChange,
}: CatExpenseTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data: expenses,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange,
    enableRowSelection: true,
    enableMultiRowSelection: true,
    state: {
      sorting,
      rowSelection,
    },
  })

  const highestExpenses = React.useMemo(
    () => Math.max(...expenses.map((expense) => expense.amount)),
    [expenses],
  )

  // highlight highest expenses
  const getRowProps: NonNullable<DataTableProps<CatExpense>['getRowProps']> =
    React.useCallback(
      (row) => {
        const amount = row.getValue<number>('amount')
        const isHighest = amount === highestExpenses

        return {
          className: isHighest ? HIGHTEST_EXPENSES_CLASSNAME : undefined,
        }
      },
      [highestExpenses],
    )

  return (
    <div>
      <DataTable
        table={table}
        columnLength={columns.length}
        getRowProps={getRowProps}
      />

      <p className="mt-4 text-sm italic text-gray-500">
        <span
          className={cn(
            'mr-2 inline-block h-3 w-3 rounded-full border border-slate-700 bg-cyan-100/50',
            HIGHTEST_EXPENSES_CLASSNAME,
          )}
          aria-hidden
        />
        Highlighted rows are the highest expenses.
      </p>
    </div>
  )
}
