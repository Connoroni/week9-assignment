import { SignUp, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <h1>Sign In</h1>
      <SignedOut>
        <p className="text-lg">
          Welcome to SOCIAL MEDIA SITE! We&apos;re glad to have you here.
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
