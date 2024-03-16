"use client";
import AuthForm from "@/components/forms/authForm";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "@/api/authApi";
export default function ListOfUsers() {
  const router = useRouter();
  const [loginUser, { isError, error }] = useLoginUserMutation();

  const handleSingInSubmit = async (formData: {
    email: string;
    password: string;
  }) => {
    const result = await loginUser(formData).unwrap();
    console.log(result);
    if (result) {
      router.push("/");
      toast.success("You successfully logged in");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <AuthForm onFormSubmit={handleSingInSubmit} isSingUp={false} />
    </main>
  );
}
