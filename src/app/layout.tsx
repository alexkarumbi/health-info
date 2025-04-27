import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getCurrentUser } from '@/lib/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Health Information System',
  description: 'Manage clients and health programs',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <html lang="en">
      <body className={inter.className}>
        {user ? (
          <div className="min-h-screen">
            {children}
          </div>
        ) : (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            {children}
          </div>
        )}
      </body>
    </html>
  )
}