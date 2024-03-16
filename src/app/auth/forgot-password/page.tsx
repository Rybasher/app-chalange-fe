"use client"
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import CustomInput from '@/components/input/customInput';
import { FormEvent, useState } from 'react';
import { useResetPasswordMutation } from '@/api/authApi';
export default function ForgotPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [resetPassword] = useResetPasswordMutation()
  const token = searchParams.get('token')
  const [state, setState] = useState({ password: '', confirmPassword: '' });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (token) {
        if (state.password !== state.confirmPassword) {
          return toast.error('Passwords must be the same');
        }
        const result = await resetPassword({
          password: state.password,
          token: token
        }).unwrap();
        if (result) {
          router.push('/auth/singin')
          toast.success('Password successfully reset');
        }
      }
    } catch (error) {
      toast.error('Password not reset');
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));

  };
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>Reset password</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="password"
          required={true}
          name='password'
          minLength={8}
          value={state.password}
          placeholder='Password'
          onChange={onChangeHandler}
        />
        <CustomInput
          required={true}
          minLength={8}
          name='confirmPassword'
          placeholder='Confirm assword'
          type="password"
          value={state.confirmPassword}
          onChange={onChangeHandler}
        />
        <div className='flex flex-col justify-between items-center w-full'>
          <button
            type="submit"
            className="mt-3 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {'Reset password'}
          </button>
        </div>
      </form>
    </main>
  )
}