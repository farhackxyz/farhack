/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import { db } from "@/kysely";
import Hackathons from "./components/hackathons";

export default async function Page() {
  const session = await auth()
  if (session?.user) {
    const user = await db.selectFrom('users')
          .selectAll()
          .where('name', '=', session.user.name ?? "")
          .executeTakeFirst();

    session.user = {
      id: user?.id.toString() ?? "0",
      name: session.user.name,
      image: session.user.image,
    }
  }

  return <Hackathons />;
}