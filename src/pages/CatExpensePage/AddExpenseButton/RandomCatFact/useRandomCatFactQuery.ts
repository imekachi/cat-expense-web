import { useQuery } from 'react-query'
import { CatFact } from '@/domain/catFact'

export function useRandomCatFactQuery() {
  return useQuery(
    'randomCatFact',
    async () =>
      fetch('https://catfact.ninja/fact').then((res) =>
        res.json(),
      ) as Promise<CatFact>,
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  )
}
