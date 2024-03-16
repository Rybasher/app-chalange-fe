'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from '../buttons/button';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Navbar: React.FC = () => {
  const { logoutState } = useActions()
  const authState = useTypedSelector(state => state.authState);

  const router = useRouter()
  const onLogout = async () => {
    logoutState();
    toast.success('You successfully logout');
    router.push('/')
  }

  return (
    <>
      <nav className="w-full h-20 bg-zinc-900 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/">
              <p>LOOOOGO</p>
            </Link>
            <ul className="hidden md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Home</p>
                </Link>
              </li>
              {authState.user ?
                (<>
                  <li>
                    <Link href="/collections">
                      <p>Collections</p>
                    </Link>
                  </li>
                </>) : (<></>)}
              <li>
                <Link href="/about">
                  <p>About</p>
                </Link>
              </li>
            </ul>
            <div className='flex items-center'>
              {authState.user ?
                (<>
                  <div className='p-3'>
                    <Link href={`/users/${authState.user.id}`}>{authState.user.email}</Link>
                  </div>
                  <Button className="p-3 border border-sky-500 rounded-lg" label={'Logout'} onClick={onLogout}></Button>
                </>) : (
                  <>
                    <Link href='/auth/singin'><Button label="SingIn" className="p-3 " /></Link>
                    <Link href='/auth/singup'><Button label="SingUp" className="p-3 border border-sky-500 rounded-lg" /></Link>
                  </>
                )}

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;