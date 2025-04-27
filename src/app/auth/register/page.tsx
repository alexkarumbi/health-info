import AuthForm from '@/components/auth/AuthForm';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default async function RegisterPage() {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create a new account</h2>
        </div>
        <AuthForm type="register" />
      </div>
    </div>
  );
}