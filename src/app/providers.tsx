'use client'

import { ReactNode, useEffect } from 'react'
import { ThemeProvider, useTheme } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { migrateLegacyStorage } from '@/lib/storageMigration'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { getTimeTheme, hasUserThemeChoice } from '@/lib/theme'

// Applica il tema in base all'orario, finché l'utente non sceglie a mano.
function AutoThemeByTime() {
  const { setTheme } = useTheme()
  useEffect(() => {
    if (!hasUserThemeChoice()) setTheme(getTimeTheme())
    const id = setInterval(() => {
      if (!hasUserThemeChoice()) setTheme(getTimeTheme())
    }, 60_000)
    return () => clearInterval(id)
  }, [setTheme])
  return null
}

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
        <AutoThemeByTime />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}
