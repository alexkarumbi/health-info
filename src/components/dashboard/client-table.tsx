'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/components/ui/table'
import { ClientWithEnrollments } from '@/lib/types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

export const columns: ColumnDef<ClientWithEnrollments>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'dob',
    header: 'Date of Birth',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dob'))
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: 'gender',
    header: 'Gender',
  },
  {
    accessorKey: 'enrollments',
    header: 'Programs',
    cell: ({ row }) => {
      const enrollments = row.getValue('enrollments') as any[]
      return enrollments.length > 0 
        ? enrollments.map(e => e.program.name).join(', ')
        : 'None'
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const client = row.original
      return (
        <Link href={`/dashboard/clients/${client.id}`}>
          <Button variant="outline" size="sm">
            <Icons.medical className="mr-2 h-4 w-4" />
            View
          </Button>
        </Link>
      )
    },
  },
]

interface ClientTableProps {
  data: ClientWithEnrollments[]
}

export function ClientTable({ data }: ClientTableProps) {
  return <DataTable columns={columns} data={data} />
}