import { ClientList } from '@/components/dashboard/ClientList';
import { ProgramForm } from '@/components/dashboard/ProgramForm';
import { ClientForm } from '@/components/dashboard/ClientForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Health Information System</h1>
      
      <Tabs defaultValue="clients" className="w-full">
        <TabsList>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clients">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Register New Client</h2>
              <ClientForm />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Client List</h2>
              <ClientList />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="programs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Create Health Program</h2>
              <ProgramForm />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Program List</h2>
              {/* Program list component would go here */}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}