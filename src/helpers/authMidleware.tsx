import React, { ReactNode } from 'react';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import { useRouter } from 'next/navigation';
import { userApi } from '@/api/userApi';

type IAuthMiddleware = {
  children: ReactNode;
};

const AuthMiddleware: React.FC<IAuthMiddleware> = ({ children }) => {
  const authState = useTypedSelector(state => state.authState);
  const router = useRouter()

  const { isLoading } = userApi.endpoints.getMe.useQuery({ token: authState.tokens ? authState.tokens.accessToken : '' }, {
    pollingInterval: 300,
    skip: authState.isAuntificated || !authState.tokens,
  });
  return children;
};

export default AuthMiddleware;
