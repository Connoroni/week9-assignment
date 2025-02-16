import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function CreatePost() {
  const clerkUser = await currentUser();
  const idJson = JSON.stringify(clerkUser.id);
  // const idQuery = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
  //   idJson,
  // ]);
  // console.log(idQuery);

  async function handleSubmit(formValues) {
    "use server";
    const formData = {
      user_id: idJson,
      post_title: formValues.get("post_title"),
      post_img: formValues.get("post_img"),
    };

    db.query(
      `INSERT INTO posts (user_id, timestamp, post_title, post_img)
      VALUES ($1, current_timestamp, $2, $3)`,
      [formData.user_id, formData.post_title, formData.post_img]
    );

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <>
      <h1>Create a Post</h1>
      <form action={handleSubmit}>
        <label htmlFor="post_title">Post title</label>
        <input
          type="text"
          name="post_title"
          id="post_title"
          placeholder="Title"
          required
        />
        <label htmlFor="post_img">Image URL</label>
        <input
          type="url"
          name="post_img"
          id="post_img"
          placeholder="Enter the URL of the image you want to post"
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </>
  );
}
