/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import Login from "./components/login";

export default async function Page() {
  const session = await auth()
  if (session?.user) {
    // TODO: fix `session.user.id` value which is coming back as `undefined`
    session.user = {
      id: session.user.id,
      name: session.user.name,
      image: session.user.image,
    }
  }
  // if(session && session.user){
  //   return <> {session.user.name} </>
  // } else{
  //   return <Login />
  // }
  return <Login />
}