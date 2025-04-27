'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { Program } from '@/lib/types'

interface EnrollmentFormProps {
  clientId: string
}

export default function EnrollmentForm({ clientId }: EnrollmentFormProps) {
  const router = useRouter()
  const [programs, setPrograms] = useState<Program[]>([])
  const [selectedProgram, setSelectedProgram] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs')
        if (!response.ok) throw new Error('Failed to fetch programs')
        const data = await response.json()
        setPrograms(data)
      } catch (error) {
        console.error('Error fetching programs:', error)
      }
    }
    fetchPrograms()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId,
          programId: selectedProgram,
          notes,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to enroll client')
      }

      toast({
        title: 'Success',
        description: 'Client enrolled successfully',
      })
      router.refresh()
      setSelectedProgram('')
      setNotes('')
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Program</Label>
        <Select
          value={selectedProgram}
          onValueChange={setSelectedProgram}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a program" />
          </SelectTrigger>
          <SelectContent>
            {programs.map((program) => (
              <SelectItem key={program.id} value={program.id}>
                {program.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional notes about the enrollment"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading || !selectedProgram}>
        {loading ? 'Enrolling...' : 'Enroll Client'}
      </Button>
    </form>
  )
}