import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";

export default async function CreatePost() {
  const clerkUser = await currentUser();
  const idJson = JSON.stringify(clerkUser.id);
  const idQuery = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [
    idJson,
  ]);
  console.log(idQuery);

  return (
    <>
      <form></form>
    </>
  );
}
