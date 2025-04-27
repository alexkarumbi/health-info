import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ClientList from '@/components/dashboard/ClientList'
import { getCurrentUser } from '@/lib/auth'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {user?.name || 'Doctor'}</h1>
        <p className="text-muted-foreground">
          Manage your clients and health programs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientList limit={5} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/dashboard/clients/new"
                className="border rounded-lg p-4 hover:bg-accent transition-colors"
              >
                <h3 className="font-medium">Add New Client</h3>
                <p className="text-sm text-muted-foreground">
                  Register a new client in the system
                </p>
              </a>
              <a
                href="/dashboard/programs/new"
                className="border rounded-lg p-4 hover:bg-accent transition-colors"
              >
                <h3 className="font-medium">Create Program</h3>
                <p className="text-sm text-muted-foreground">
                  Set up a new health program
                </p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}