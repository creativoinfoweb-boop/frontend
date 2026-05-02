// Migrazione soft delle chiavi localStorage da prefix legacy `eldorado_` al nuovo `valorox_`.
// Preserva i progressi degli utenti esistenti dopo il rebrand.

const LEGACY_PREFIX = 'eldorado_'
const NEW_PREFIX = 'valorox_'
const MIGRATION_FLAG = 'valorox_storage_migrated_v1'

export function migrateLegacyStorage(): void {
  if (typeof window === 'undefined') return
  try {
    if (localStorage.getItem(MIGRATION_FLAG)) return
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k.startsWith(LEGACY_PREFIX)) keys.push(k)
    }
    for (const key of keys) {
      const newKey = NEW_PREFIX + key.slice(LEGACY_PREFIX.length)
      if (localStorage.getItem(newKey) == null) {
        const v = localStorage.getItem(key)
        if (v != null) localStorage.setItem(newKey, v)
      }
    }
    localStorage.setItem(MIGRATION_FLAG, '1')
  } catch {
    /* ignore quota / privacy mode errors */
  }
}
