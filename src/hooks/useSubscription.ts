import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

export function useHasActiveSubscription() {
  const { data, isLoading } = useQuery({
    queryKey: ['subscription-status'],
    queryFn: async () => {
      const res = await api.get('/subscriptions/status')
      return res.data
    },
    staleTime: 60_000,
  })
  return {
    hasActive: data?.status === 'active' || data?.status === 'trialing',
    isLoading,
    status: data?.status ?? null,
  }
}
