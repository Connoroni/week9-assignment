import { db } from "@/utils/dbConnection.js";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import SeparatorComponent from "@/components/SeparatorComponent";

export async function generateMetadata({ params }) {
  const pageParams = await params;
  const userMetadata = (
    await db.query(`SELECT * FROM users WHERE username = $1`, [
      pageParams.username,
    ])
  ).rows;
  return {
    title: `TUSS - Profile of ${userMetadata[0].username}`,
    description: `The profile belonging to ${userMetadata[0].username}.`,
  };
}

export default async function UserProfile({ params }) {
  const usernameParams = await params;
  //   console.log("PARAMS OBJECT:", usernameParams);
  const userData = (
    await db.query(`SELECT * FROM users WHERE username = $1`, [
      usernameParams.username,
    ])
  ).rows;
  console.log("USER_DATA:", userData);

  if (userData.length === 0) {
    notFound();
  }

  const posts = (
    await db.query(
      `SELECT users.username, users.profile_pic, posts.id, posts.user_id, posts.timestamp, posts.post_title, posts.post_img, posts.post_alt
      FROM users
      JOIN posts ON posts.user_id = users.clerk_id
      WHERE users.username = $1`,
      [usernameParams.username]
    )
  ).rows;

  async function handleSubmit(formValues) {
    "use server";

    const formData = {
      username: formValues.get("username"),
      first_name: formValues.get("first_name"),
      last_name: formValues.get("last_name"),
      profile_pic: formValues.get("profile_pic"),
      location: formValues.get("location"),
      bio: formValues.get("bio"),
    };

    await db.query(
      `UPDATE users SET username = $1, first_name = $2, last_name = $3, profile_pic = $4, location = $5, bio = $6 WHERE id = $7`,
      [
        formData.username,
        formData.first_name,
        formData.last_name,
        formData.profile_pic,
        formData.location,
        formData.bio,
        userData.id,
      ]
    );

    revalidatePath(`/users/${formData.username}`);
    redirect(`/users/${formData.username}`);
  }

  return (
    <>
      {userData.map((user) => (
        <section key={user.id} className="whole-page-section">
          <section className="profile">
            <div className="profile-left">
              <Image
                src={user.profile_pic}
                alt="Your profile picture, isn't it beautiful?"
                width={200}
                height={200}
              />
            </div>
            <div className="profile-right">
              <h1>{user.username}</h1>
              <p>
                {user.first_name} {user.last_name} {user.location}
              </p>
              <div className="bio-div">
                <p>{user.bio}</p>
              </div>
            </div>
          </section>
          <SeparatorComponent orientation="horizontal" />
          <section>
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
          <SeparatorComponent orientation="horizontal" />
          <section className="edit-profile">
            <h2>Edit profile</h2>
            <p>
              Fields marked with a (*) are required and can&apos;t be left
              empty.
            </p>
            <div className="flex flex-col flex-wrap">
              <form action={handleSubmit}>
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  defaultValue={user.username}
                  required
                />
                <label htmlFor="first_name">First name</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  defaultValue={user.first_name}
                />
                <label htmlFor="last_name">Surname</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  defaultValue={user.last_name}
                />
                <label htmlFor="profile_pic"> Profile picture URL *</label>
                <input
                  type="url"
                  name="profile_pic"
                  id="profile_pic"
                  placeholder="Enter the URL of an image to use for your profile picture"
                  defaultValue={user.profile_pic}
                  required
                />
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  defaultValue={user.location}
                />
                <label htmlFor="bio">Bio</label>
                <textarea
                  name="bio"
                  id="bio"
                  placeholder="Type your bio here..."
                  defaultValue={user.bio}
                />
                <button type="submit">Apply changes</button>
              </form>
            </div>
          </section>
        </section>
      ))}
    </>
  );
}
