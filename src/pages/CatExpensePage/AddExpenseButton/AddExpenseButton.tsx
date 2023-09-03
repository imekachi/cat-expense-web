import { zodResolver } from '@hookform/resolvers/zod'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { CAT_EXPENSE_CATEGORIES } from '@/domain/catExpense'
import { Button } from '@/lib/design-system/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/lib/design-system/Dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/lib/design-system/Form'
import { Input } from '@/lib/design-system/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/design-system/Select'
import { RandomCatFact } from './RandomCatFact'

const addExpenseSchema = z.object({
  title: z.string().min(1, 'Please enter the title.'),
  categoryId: z.string(),
  amount: z.coerce
    // .coerce is used to parse the input value to a number
    .number()
    .min(0.01, 'Please enter the amount.')
    // max 2 decimal places
    .multipleOf(0.01),
})

type AddExpenseFormValues = z.infer<typeof addExpenseSchema>

export type AddExpenseButtonProps = {
  onSubmit: (values: AddExpenseFormValues) => void
}

export function AddExpenseButton({ onSubmit }: AddExpenseButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const form = useForm<AddExpenseFormValues>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      title: '',
      categoryId: CAT_EXPENSE_CATEGORIES[0].id,
      amount: 0,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    onSubmit(values)
    form.reset()
    setIsOpen(false)
  })

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Expense</Button>
      </DialogTrigger>
      <Form {...form}>
        <DialogContent className="sm:max-w-lg">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add expense</DialogTitle>
              <DialogDescription asChild>
                <RandomCatFact />
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormFieldLayout
                    label="Title: "
                    input={<Input placeholder="Expense title..." {...field} />}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormFieldLayout
                    label="Category: "
                    input={
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CAT_EXPENSE_CATEGORIES.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    }
                  />
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormFieldLayout
                    label="Amount: "
                    input={
                      <Input
                        className="max-w-[10rem]"
                        type="number"
                        step=".01"
                        pattern="^\d+(?:\.\d{1,2})?$"
                        {...field}
                      />
                    }
                  />
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  )
}

type FormFieldLayoutProps = {
  label: React.ReactNode
  input: React.ReactNode
}
function FormFieldLayout({ label, input }: FormFieldLayoutProps) {
  return (
    <FormItem className="grid grid-cols-4 items-start gap-4 space-y-0">
      <FormLabel className="mt-3 text-right">{label}</FormLabel>
      <div className="col-span-3 space-y-1">
        <FormControl>{input}</FormControl>
        <FormMessage />
      </div>
    </FormItem>
  )
}
