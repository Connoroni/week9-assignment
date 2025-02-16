import { db } from "@/utils/dbConnection.js";

export default async function UserProfile({ params }) {
  const usernameParams = await params;
  //   console.log("PARAMS OBJECT:", usernameParams);
  const userData = (
    await db.query(`SELECT * FROM users WHERE username = $1`, [
      usernameParams.username,
    ])
  ).rows;
  console.log("USER_DATA:", userData);

  return (
    <>
      <section className="profile"></section>
      <section className="edit-profile">
        <h2>Edit profile</h2>
        <p></p>
        <form>
          <div>
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={userData.username}
              required
            />
            <label htmlFor="first_name">First name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              defaultValue={userData.first_name}
            />
            <label htmlFor="last_name">Surname</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              defaultValue={userData.last_name}
            />
            <label htmlFor="profile_pic"> Profile picture URL</label>
            <input
              type="url"
              name="profile_pic"
              id="profile_pic"
              placeholder="Enter the URL of an image to use for your profile picture"
              defaultValue={userData.profile_pic}
            />
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              defaultValue={userData.location}
            />
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              placeholder="Type your bio here..."
              defaultValue={userData.bio}
            />
            <button type="submit">Create profile</button>
          </div>
        </form>
      </section>
    </>
  );
}
