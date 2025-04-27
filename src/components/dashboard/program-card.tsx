import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { ProgramWithEnrollments } from '@/lib/types'

interface ProgramCardProps {
  program: ProgramWithEnrollments
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{program.name}</h3>
      </CardHeader>
      <CardContent className="pb-2">
        {program.description && (
          <p className="text-sm text-muted-foreground">
            {program.description}
          </p>
        )}
        <div className="mt-2">
          <p className="text-sm">
            <span className="font-medium">Enrollments:</span>{' '}
            {program.enrollments.length}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/dashboard/programs/${program.id}`}>
          <Button variant="outline" size="sm">
            <Icons.medical className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}