import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export const metadata = {
  title: "TUSS - Page Not Found",
  description:
    "The page you were looking for cannot be found. You have our apologies.",
};

export default function NotFound() {
  return (
    <>
      <h1>Page Not Found</h1>
      <p>
        We couldn&apos;t find that page, sorry about that. Try navigating to one
        of the other pages linked below.
      </p>
      <Link href={"/"}>Go home.</Link>
      <p>
        <SignInButton />
        &nbsp;
        <SignUpButton />
      </p>
    </>
  );
}
