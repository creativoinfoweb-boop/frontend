'use client'

import { ReactNode, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { migrateLegacyStorage } from '@/lib/storageMigration'
import { LanguageProvider } from '@/i18n/LanguageContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
    },
  },
})

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => { migrateLegacyStorage() }, [])

  return (
    <LanguageProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="valorox-theme">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
