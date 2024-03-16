"use client";
import React, { type ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "@store/store";

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
      {/* <Loading /> */}
      {children}
    </ReduxProvider>
  );
};

export default RootTemplate;
