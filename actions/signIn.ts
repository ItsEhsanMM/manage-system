"use server";

import { signIn } from "@/auth";
import { loginSchema } from "@/Schema/user";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
import { z, ZodError } from "zod";

export async function SignIn(
  provider: string,
  credentials?: z.infer<typeof loginSchema>,
) {
  try {
    if (provider == "credentials") {
      await signIn(provider, { ...credentials, redirect: false});
      return redirect("/")
    } 
  } catch (error) {
   if (error instanceof CredentialsSignin) {
      return error.cause;
    } else if (error instanceof ZodError) {
      return error.message;
    } else if (error instanceof Error) {
      console.log(error);
      return error.message;
    } else if (typeof error === "string") {
      return error;
    } else {
      return "something went wrong";
    }
  }
}