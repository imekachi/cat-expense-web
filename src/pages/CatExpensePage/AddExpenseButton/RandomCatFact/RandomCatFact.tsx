import { useRandomCatFactQuery } from '@/pages/CatExpensePage/AddExpenseButton/RandomCatFact/useRandomCatFactQuery'

export function RandomCatFact() {
  const { data } = useRandomCatFactQuery()

  if (!data) return null

  return (
    <article className="text-sm italic text-slate-400">
      <header className="font-semibold">Random cat fact:</header>
      <p>{data.fact}</p>
    </article>
  )
}
