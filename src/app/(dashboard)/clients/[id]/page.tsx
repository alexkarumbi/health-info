import { notFound } from 'next/navigation';
import { EnrollmentForm } from '@/components/dashboard/EnrollmentForm';

interface ClientPageProps {
  params: { id: string };
}

export default async function ClientPage({ params }: ClientPageProps) {
  const response = await fetch(`http://localhost:3000/api/clients/${params.id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    throw new Error('Failed to fetch client');
  }
  
  const client = await response.json();
  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">
        {client.firstName} {client.lastName}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Date of Birth</p>
                <p>{new Date(client.dob).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Gender</p>
                <p>{client.gender}</p>
              </div>
              <div>
                <p className="text-gray-600">Address</p>
                <p>{client.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p>{client.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p>{client.email || 'N/A'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Program Enrollments</h2>
            {client.enrollments.length > 0 ? (
              <div className="space-y-4">
                {client.enrollments.map((enrollment: any) => (
                  <div key={enrollment.id} className="border p-4 rounded">
                    <h3 className="font-medium">{enrollment.program.name}</h3>
                    <p className="text-sm text-gray-600">
                      Enrolled on: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">Status: {enrollment.status}</p>
                    {enrollment.notes && (
                      <p className="mt-2 text-sm">Notes: {enrollment.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No program enrollments</p>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Enroll in Program</h2>
            <EnrollmentForm clientId={client.id} />
          </div>
        </div>
      </div>
    </div>
  );
}