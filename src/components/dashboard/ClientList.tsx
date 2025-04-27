'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Client } from '@/lib/types'

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`/api/clients?search=${searchTerm}`)
        if (!response.ok) throw new Error('Failed to fetch clients')
        const data = await response.json()
        setClients(data)
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(() => {
      fetchClients()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {loading ? (
        <div>Loading clients...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Programs</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  {client.firstName} {client.lastName}
                </TableCell>
                <TableCell>
                  {new Date(client.dob).toLocaleDateString()}
                </TableCell>
                <TableCell>{client.gender}</TableCell>
                <TableCell>
                  {client.enrollments?.length || 0} enrolled
                </TableCell>
                <TableCell>
                  <Link href={`/dashboard/clients/${client.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}