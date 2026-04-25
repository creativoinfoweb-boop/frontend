'use client'

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-60px)]">
      {children}
    </div>
  )
}
