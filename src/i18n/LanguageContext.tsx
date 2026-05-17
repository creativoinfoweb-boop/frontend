'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations } from './translations'

export type LangCode = 'it' | 'en' | 'fr' | 'de' | 'es'

export const LANGUAGES: { code: LangCode; label: string; flag: string; flagCode: string }[] = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹', flagCode: 'it' },
  { code: 'en', label: 'English', flag: '🇬🇧', flagCode: 'gb' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', flagCode: 'fr' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', flagCode: 'de' },
  { code: 'es', label: 'Español', flag: '🇪🇸', flagCode: 'es' },
]

type LanguageContextType = {
  lang: LangCode
  setLang: (l: LangCode) => void
  t: (typeof translations)[LangCode]
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'it',
  setLang: () => {},
  t: translations['it'],
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('it')

  useEffect(() => {
    const saved = localStorage.getItem('valorox-lang') as LangCode | null
    if (saved && translations[saved]) setLangState(saved)
  }, [])

  const setLang = (l: LangCode) => {
    setLangState(l)
    localStorage.setItem('valorox-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
