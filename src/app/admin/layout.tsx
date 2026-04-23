'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth'
import Link from 'next/link'
import { LayoutDashboard, Users, Tags, Radio, LogOut, Server, Sun, Moon, Users2 } from 'lucide-react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('admin-theme')
    if (saved === 'light') {
      setIsDark(false)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('admin-theme', isDark ? 'dark' : 'light')
      if (isDark) {
        document.documentElement.style.colorScheme = 'dark'
      } else {
        document.documentElement.style.colorScheme = 'light'
      }
    }
  }, [isDark, mounted])

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user?.is_admin) {
    return null
  }

  const adminNavigation = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Utenti', href: '/admin/users', icon: Users },
    { label: 'Account MT5', href: '/admin/accounts', icon: Server },
    { label: 'Coupon', href: '/admin/coupons', icon: Tags },
    { label: 'Segnali', href: '/admin/signals', icon: Radio },
    { label: 'Affiliati', href: '/admin/affiliates', icon: Users2 },
  ]

  if (!mounted) return null

  const bgPrimary = isDark ? '#070710' : '#F8F8F8'
  const bgSecondary = isDark ? '#12121F' : '#FFFFFF'
  const bgTertiary = isDark ? '#0A0A14' : '#F3F3F3'
  const borderColor = isDark ? '#1E1E35' : '#E5E5E5'
  const textPrimary = isDark ? '#F4F4F5' : '#1A1A1A'
  const textSecondary = isDark ? '#A1A1AA' : '#666666'
  const textTertiary = isDark ? '#71717A' : '#999999'

  return (
    <div className="flex h-screen" style={{ background: bgPrimary }}>
      {/* Sidebar */}
      <aside className="w-64 flex flex-col" style={{ borderRight: `1px solid ${borderColor}`, background: bgSecondary }}>
        {/* Logo */}
        <div className="p-6" style={{ borderBottom: `1px solid ${borderColor}` }}>
          <h2 className="text-xl font-bold text-[#F5A623]">Admin Panel</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {adminNavigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: textSecondary,
                  background: 'transparent'
                }}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:text-[#F4F4F5] transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.background = isDark ? '#1A1A2E' : '#E8E8E8'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 space-y-2" style={{ borderTop: `1px solid ${borderColor}` }}>
          <div className="text-xs px-4 py-2" style={{ color: textTertiary }}>
            <p className="font-semibold" style={{ color: textPrimary }}>{user?.username}</p>
            <p style={{ color: textSecondary }}>{user?.email}</p>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            style={{
              color: isDark ? '#F5A623' : '#F59E0B',
              background: isDark ? '#F5A62315' : '#F59E0B15',
              border: `1px solid ${isDark ? '#F5A62330' : '#F59E0B30'}`
            }}
            title={isDark ? 'Modalità chiara' : 'Modalità scura'}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {isDark ? 'Chiaro' : 'Scuro'}
          </button>
          <button
            onClick={() => {
              logout()
              router.push('/auth/login')
            }}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            style={{
              color: '#EF4444',
              background: '#EF444410',
              border: '1px solid #EF444425'
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto" style={{ background: bgTertiary }}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
