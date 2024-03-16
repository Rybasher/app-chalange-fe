"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { toast } from "react-toastify";


export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const router = useRouter()
    const authState = useTypedSelector(state => state.authState);
    useEffect(() => {
      if (!authState.user) {
        return router.push('/')
      }
    }, [router, authState.user]);

    if (!authState.user) {
      return null;
    }

    return <Component {...props} />;
  };
}