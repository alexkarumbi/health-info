import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { ClientWithEnrollments } from '@/lib/types'

interface ClientCardProps {
  client: ClientWithEnrollments
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">
          {client.firstName} {client.lastName}
        </h3>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div>
            <span className="font-medium">DOB:</span>{' '}
            {new Date(client.dob).toLocaleDateString()}
          </div>
          <div>
            <span className="font-medium">Gender:</span> {client.gender}
          </div>
        </div>
        {client.enrollments.length > 0 && (
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-medium">Programs:</span>{' '}
              {client.enrollments
                .map((e) => e.program.name)
                .join(', ')}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/dashboard/clients/${client.id}`}>
          <Button variant="outline" size="sm">
            <Icons.medical className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}