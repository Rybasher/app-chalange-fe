"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastContainerWrapper() {
  return (
    <ToastContainer  theme="dark" />
  );
}