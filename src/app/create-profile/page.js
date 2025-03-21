import { db } from "@/utils/dbConnection.js";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "TUSS - Create Profile",
  description:
    "Page for users to create their profiles after creating an account",
};

export default async function CreateProfile() {
  const clerkUser = await currentUser();
  // console.log(clerkUser);
  const emailJson = JSON.stringify(clerkUser.emailAddresses[0].emailAddress);
  const idJson = JSON.stringify(clerkUser.id);
  console.log("JSON data test:", emailJson, idJson);
  const picJson = JSON.stringify(clerkUser.imageUrl);
  // Big credit to Cameron for helping me fix this, I was getting errors saying the values of id and emailAddresses[0].emailAddress were undefined because I was stringifying the whole object. Cameron's solution was to stringify only the bits I needed since there are data types like boolean (and maybe the emailAddresses array) in the object that don't work when stringified.

  async function handleSubmit(formValues) {
    "use server";

    // let pfp = picJson;

    // if (formValues.get("profile_pic") !== null) {
    //   pfp = formValues.get("profile_pic");
    // }

    const formData = {
      clerk_id: idJson,
      username: formValues.get("username"),
      first_name: formValues.get("first_name"),
      last_name: formValues.get("last_name"),
      email: emailJson,
      profile_pic: formValues.get("profile_pic"),
      location: formValues.get("location"),
      bio: formValues.get("bio"),
    };

    db.query(
      `INSERT INTO users (clerk_id, username, first_name, last_name, email, profile_pic, location, bio)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        formData.clerk_id,
        formData.username,
        formData?.first_name,
        formData?.last_name,
        formData.email,
        formData?.profile_pic,
        formData?.location,
        formData?.bio,
      ]
    );
    redirect("/");
  }

  return (
    <>
      <h1>Create your profile</h1>
      <p>Enter your information in the form below to create your profile:</p>
      <p>Fields marked with a (*) are required and can&apos;t be left empty.</p>
      <form action={handleSubmit} className="flex flex-col">
        <label htmlFor="username">Username *</label>
        <input type="text" name="username" id="username" required />
        <label htmlFor="first_name">First name</label>
        <input type="text" name="first_name" id="first_name" />
        <label htmlFor="last_name">Surname</label>
        <input type="text" name="last_name" id="last_name" />
        <label htmlFor="profile_pic"> Profile picture URL *</label>
        <input
          type="url"
          name="profile_pic"
          id="profile_pic"
          placeholder="Enter the URL of an image to use for your profile picture"
          required
        />
        <label htmlFor="location">Location</label>
        <input type="text" name="location" id="location" />
        <label htmlFor="bio">Bio</label>
        <textarea name="bio" id="bio" placeholder="Type your bio here..." />
        <button type="submit">Create profile</button>
      </form>
    </>
  );
}
