import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { CatExpense } from '@/domain/catExpense'
import { DataTable, DataTableProps } from '@/lib/design-system/DataTable'
import { cn } from '@/lib/utils/cn'
import { catExpenseColumns } from './catExpenseColumns'
import { getHighestExpenseCategories } from './getHighestExpenseCategories'

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
    columns: catExpenseColumns,
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

  const highestExpenseCategoryIds = React.useMemo(
    () => getHighestExpenseCategories(expenses),
    [expenses],
  )

  // highlight highest expenses
  const getRowProps: NonNullable<DataTableProps<CatExpense>['getRowProps']> =
    React.useCallback(
      (row) => {
        const categoryId = row.getValue<CatExpense['categoryId']>('categoryId')
        const isHighestCategory = highestExpenseCategoryIds.includes(categoryId)

        return {
          className: isHighestCategory
            ? HIGHTEST_EXPENSES_CLASSNAME
            : undefined,
        }
      },
      [highestExpenseCategoryIds],
    )

  return (
    <div>
      <DataTable
        table={table}
        columnLength={catExpenseColumns.length}
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
        Highlighted rows are the highest expense categories.
      </p>
    </div>
  )
}
