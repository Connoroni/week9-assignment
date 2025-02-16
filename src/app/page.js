import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/dbConnection";

export default async function Home() {
  let usernameQuery;

  const clerkUser = await currentUser();
  // console.log("User object:", clerkUser);
  if (clerkUser !== null) {
    const jsonUser = JSON.stringify(clerkUser.id);
    // console.log("ID:", jsonUser);

    const query = (
      await db.query(`SELECT username FROM users WHERE clerk_id = $1`, [
        jsonUser,
      ])
    ).rows;
    usernameQuery = query;
  }

  // console.log("Query return:", usernameQuery);

  return (
    <>
      <h1>Home</h1>
      <p>
        Welcome to TUSS, The Untitled Social Site. TUSS was made with a vision
        to cast off all the bloat of modern social media and harkon back to an
        earlier era of the internet without followers, reels, AI, and clickbait.
        We promise that this has always been our mission statement, and
        isn&apos;t something the developer came up with to justify the simple
        design of TUSS.
      </p>
      <section className="flex justify-around">
        <div>
          {usernameQuery ? (
            <SignedIn>
              <Link href={`/users/${usernameQuery[0].username}`}>
                <h2>My Profile</h2>
                <p>
                  Here you can view and customise your profile with
                  informationlike a bio, location, name, and profile picture.
                  This information is only visible to you.
                </p>
              </Link>
            </SignedIn>
          ) : (
            <>
              <h2>My Profile</h2>
              <p>
                Here you can view and customise your profile with
                informationlike a bio, location, name, and profile picture. This
                information is only visible to you.
              </p>
            </>
          )}

          <SignedOut>
            <h2>My Profile</h2>
            <p>
              You are not signed in. <SignInButton /> or <SignUpButton /> here.
            </p>
          </SignedOut>
        </div>
        <div>
          <Link href="/posts">
            <h2>Post Feed</h2>
            <p>
              The main feature of the site. Here you can make a post, or see
              posts created by yourself and other users.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
