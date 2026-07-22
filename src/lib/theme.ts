// Tema automatico in base all'orario, finché l'utente non sceglie manualmente.
// Giorno (07:00–18:59) → light · Notte (19:00–06:59) → dark.

const USER_KEY = 'valorox-theme-userset'

export function getTimeTheme(): 'light' | 'dark' {
  const h = new Date().getHours()
  return h >= 7 && h < 19 ? 'light' : 'dark'
}

export function hasUserThemeChoice(): boolean {
  try {
    return localStorage.getItem(USER_KEY) === '1'
  } catch {
    return false
  }
}

// Da chiamare quando l'utente cambia tema a mano: da lì in poi niente più auto.
export function markThemeUserChoice() {
  try {
    localStorage.setItem(USER_KEY, '1')
  } catch {
    /* ignore */
  }
}
