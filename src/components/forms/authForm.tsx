import Link from 'next/link';
import React, { useState, FormEvent } from 'react';
import CustomInput from '../input/customInput';
import { toast } from 'react-toastify';

type AuthFormProps = {
  onFormSubmit: (formData: { email: string; password: string, name?: string }) => void;
  isSingUp: boolean;
  error?: string;
};

export interface Login {
  email: string;
  password: string
}

export interface Registration {
  name: string;
  email: string;
  password: string
}
export interface AuthFormStates {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onFormSubmit, isSingUp, error }) => {
  const [state, setState] = useState<AuthFormStates>({ email: '', password: '', name: '', confirmPassword: '' });
  const passwordReg = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!passwordReg.test(state.password)) {
      toast.error('Pasword must be stronger');
      return
    }


    if (isSingUp) {
      if (state.password !== state.confirmPassword) {
        toast.error('Paswords must be the same');
        return
      }
      const userRegisatation: Registration = {
        email: state.email,
        name: state.name,
        password: state.password
      }

      onFormSubmit(userRegisatation);
    } else {
      const userLogin: Login = {
        email: state.email,
        password: state.password
      }
        ;
      onFormSubmit(userLogin);
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
    <form onSubmit={handleSubmit} className='w-full flex flex-col justify-between items-center'>
      <div className='flex flex-col justify-between items-center h-60 w-1/5'>
        {isSingUp ? (<h3 className='text-2xl'>Create an account</h3>) : (<h3 className='text-2xl'>Log in to your account</h3>)}
        <div className='w-full flex flex-col justify-between items-center'>
          {isSingUp && (
            <CustomInput
              type="text"
              required={true}
              name='name'
              value={state.name}
              placeholder='Name'
              onChange={onChangeHandler}
            />
          )}

          <CustomInput
            type="email"
            required={true}
            name='email'
            value={state.email}
            placeholder='Email'
            onChange={onChangeHandler}
          />

          <CustomInput
            type="password"
            required={true}
            name='password'
            minLength={8}
            value={state.password}
            placeholder='Password'
            onChange={onChangeHandler}
          />

          {isSingUp && (
            <CustomInput
              required={true}
              minLength={8}
              name='confirmPassword'
              placeholder='Confirm assword'
              type="password"
              value={state.confirmPassword}
              onChange={onChangeHandler}
            />
          )}
        </div>
        <div className='flex flex-col justify-between items-center w-full'>
          <button
            type="submit"
            className="mt-3 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            {isSingUp ? 'SingUp' : 'SingIn'}
          </button>
        </div>
        <div>
          <p className='text-rose-600'>{error}</p>
        </div>
        <div>
          {isSingUp ? (
            <p>Have an account? <Link className='text-sky-400/100' href='/auth/singin'>SingIn</Link> </p>
          ) : (
            <>
              <p>Don`t have am account? <Link className='text-sky-400/100' href='/auth/singup'>SingUp</Link> </p>
              <p>Forgot password? <Link className='text-sky-400/100' href='./auth/forgot-password'>Reset</Link> </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default AuthForm;