import AuthForm from '@/components/auth/AuthForm'
import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const user = await getCurrentUser()
  if (user) redirect('/dashboard')

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Sign in to your account</h2>
      </div>
      <AuthForm type="login" />
    </div>
  )
}