import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import EnrollmentForm from '@/components/dashboard/EnrollmentForm'

interface ClientPageProps {
  params: { id: string }
}

export default async function ClientPage({ params }: ClientPageProps) {
  const response = await fetch(`http://localhost:3000/api/clients/${params.id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    if (response.status === 404) {
      notFound()
    }
    throw new Error('Failed to fetch client')
  }

  const client = await response.json()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {client.firstName} {client.lastName}
        </h1>
        <Link href="/dashboard/clients">
          <Button variant="outline">Back to Clients</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p>{new Date(client.dob).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p>{client.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>{client.address || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{client.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{client.email || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Program Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              {client.enrollments.length > 0 ? (
                <div className="space-y-4">
                  {client.enrollments.map((enrollment: any) => (
                    <div key={enrollment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{enrollment.program.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Status: {enrollment.status}
                          </p>
                        </div>
                      </div>
                      {enrollment.notes && (
                        <p className="mt-2 text-sm">{enrollment.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No program enrollments</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Enroll in Program</CardTitle>
            </CardHeader>
            <CardContent>
              <EnrollmentForm clientId={client.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}