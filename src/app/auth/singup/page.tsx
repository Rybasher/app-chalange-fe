"use client"
import { useRegisterUserMutation } from '@/api/authApi';
import AuthForm from '@/components/forms/authForm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function SingUp() {
  const router = useRouter()
  const [registrate] = useRegisterUserMutation()
  const handleSingupSubmit = async (formData: { email: string; password: string, name?: string }) => {
    const result = await registrate(formData).unwrap()
    if (result) {
      router.push('/auth/singin')
      toast.success('You successfully registrate');
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <AuthForm onFormSubmit={handleSingupSubmit} isSingUp={true} />
    </main>
  )
}