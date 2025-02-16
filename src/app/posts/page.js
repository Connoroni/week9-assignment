import { db } from "@/utils/dbConnection.js";
import Image from "next/image";
import Link from "next/link";
import create_post from "@/../public/assets/create_post.png";

export default async function PostFeed({ searchParams }) {
  const posts = (
    await db.query(
      `SELECT users.username, users.profile_pic, posts.id, posts.user_id, posts.timestamp, posts.post_title, posts.post_img, posts.post_alt
      FROM users
      JOIN posts ON posts.user_id = users.clerk_id`
    )
  ).rows;

  const query = await searchParams;
  if (query.sort === "desc") {
    posts.reverse();
  }

  return (
    <section>
      <Link href={"/create-post"}>
        <Image
          className="bg-slate-300 rounded-md"
          src={create_post}
          alt="A black square with a black pen writing in it. This is the icon representing 'create post'."
          width={50}
          height={50}
        />
      </Link>
      <div className="sorts">
        <Link href={"/?sort=asc"}>Sort Posts ↑ (newest first)&nbsp;</Link>
        <Link href={"/?sort=desc"}>Sort Posts ↓ (oldest first)</Link>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <div className="post-header">
            <Image
              src={post.profile_pic}
              alt="The user's profile picture"
              width={50}
              height={50}
            />
            <p className="post-username">{post.username}</p>
            <p className="post-timestamp">
              {post.timestamp.toDateString()},&nbsp;
              {post.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <h2 className="post-title">{post.post_title}</h2>
          <Image
            src={post.post_img}
            alt={post.post_alt}
            width={200}
            height={200}
          />
        </div>
      ))}
    </section>
  );
}
