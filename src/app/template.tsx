"use client";
import React, { type ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import ToastContainerWrapper from '@/components/toast.provider';

import { store } from "@store/store";
import AuthMiddleware from "@/helpers/authMidleware";

// const Loading = () => {
//   const isRequestLoading = useSelector((state) => state.app.isLoading);

//   return <>{isRequestLoading && <LoadingScreen />}</>;
// };

interface Props {
  children: ReactNode;
}

const RootTemplate = ({ children }: Props) => {
  return (
    <ReduxProvider store={store}>
        <AuthMiddleware>
          {children}
        </AuthMiddleware>
      <ToastContainerWrapper />
    </ReduxProvider>
  );
};

export default RootTemplate;
