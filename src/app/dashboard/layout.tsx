import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}
