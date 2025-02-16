import { db } from "@/utils/dbConnection.js";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

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
          <section className="edit-profile">
            <h2>Edit profile</h2>
            <p>Fields marked with a (*) are required.</p>
            <div className="flex flex-col flex-wrap">
              <form action={handleSubmit}>
                <label htmlFor="username">Username*</label>
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
                <label htmlFor="profile_pic"> Profile picture URL</label>
                <input
                  type="url"
                  name="profile_pic"
                  id="profile_pic"
                  placeholder="Enter the URL of an image to use for your profile picture"
                  defaultValue={user.profile_pic}
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
