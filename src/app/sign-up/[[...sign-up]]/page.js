import { SignUp, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export const metadata = {
  title: "TUSS - Sign Up",
  description: "New users sign up for TUSS, The Untitled Social Site",
};

export default function SignUpPage() {
  return (
    <>
      <h1>Sign Up</h1>
      <SignedOut>
        <p className="text-lg">
          Welcome to TUSS, The Untitled Social Site! We&apos;re glad to have you
          here.
        </p>
        <p className="text-lg">Sign up below to create an account.</p>
        <p className="text-base">
          Or <SignInButton /> if you already have an account.
        </p>
        <SignUp />
      </SignedOut>
      <SignedIn>
        <p>You are already signed in.</p>
        <Link href={"/"}>Click here to go home</Link>
      </SignedIn>
    </>
  );
}
