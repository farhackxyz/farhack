/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import Dashboard from "./components/Dashboard";
import Login from "./components/login";

export default async function Page() {
  const session = await auth()
  if (session?.user) {
    // id is undefined, fix & also fetch from db
    session.user = {
      id: session.user.id,
      name: session.user.name,
      image: session.user.image,
    }
  }
  if(session && session.user){
    console.log("USER", session.user);
    return <Login />
  } else{
    return <Login />
  }
}