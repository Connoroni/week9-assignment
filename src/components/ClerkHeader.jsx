import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function ClerkHeader() {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
