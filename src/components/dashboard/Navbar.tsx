'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from './button'
import { signOut } from '@/app/actions'
import { Icons } from './icons'

export function Navbar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <Icons.dashboard /> },
    { name: 'Clients', href: '/dashboard/clients', icon: <Icons.users /> },
    { name: 'Programs', href: '/dashboard/programs', icon: <Icons.medical /> },
  ]

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <nav className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <form action={signOut}>
          <Button variant="outline" size="sm">
            <Icons.logout className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </div>
    </header>
  )
}