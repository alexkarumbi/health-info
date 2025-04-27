'use client'

import { Input } from '../ui/input'
import { Icons } from '@/components/ui/icons'
import { useDebouncedCallback } from 'use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function SearchBar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icons.search className="w-5 h-5 text-gray-400" />
      </div>
      <Input
        type="search"
        placeholder="Search clients..."
        className="pl-10"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />
    </div>
  )
}