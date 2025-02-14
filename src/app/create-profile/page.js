import db from "@/utils/dbConnection.js";
import { currentUser } from "@clerk/nextjs/server";

export default async function CreateProfile() {
  const clerkUser = await currentUser();
  // console.log(clerkUser);
  const clerkJson = JSON.stringify(clerkUser);
  console.log(clerkJson);

  async function handleSubmit(formValues) {
    "use server";
    const formData = {
      clerk_id: clerkJson.id,
      username: formValues.get("username"),
      first_name: formValues.get("first_name"),
      last_name: formValues.get("last_name"),
      email: clerkJson.emailAddresses[0],
      profile_pic: formValues.get("profile_pic"),
      location: formValues.get("location"),
      bio: formValues.get("bio"),
    };
  }

  return (
    <>
      <h1>Create your profile</h1>
      <p>Enter your information in the form below to create your profile:</p>
      <p>Fields marked with a &lpar;*&rpar; are required.</p>
      <form>
        <label htmlFor="username">Username*</label>
        <input type="text" name="username" id="username" required />
        <label htmlFor="first_name">First name</label>
        <input type="text" name="first_name" id="first_name" />
        <label htmlFor="last_name">Surname</label>
        <input type="text" name="last_name" id="last_name" />
        <label htmlFor="profile_pic"> Profile picture URL</label>
        <input
          type="url"
          name="profile_pic"
          id="profile_pic"
          placeholder="Enter the URL of an image to use for your profile picture"
        />
        <label htmlFor="location">Location</label>
        <input type="text" name="location" id="location" />
        <label htmlFor="bio">Bio</label>
        <textarea name="bio" id="bio" placeholder="Type your bio here..." />
      </form>
    </>
  );
}
