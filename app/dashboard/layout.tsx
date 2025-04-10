import { ReactNode } from 'react'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

// Тип для пропсов
type DashboardLayoutProps = {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <main className="dashboard-content">
        {/* <DashboardHeader /> */}
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  )
}