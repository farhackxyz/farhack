/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import { db } from "@/kysely";
import Hackathons from "./components/hackathons";
import { TicketIcon } from "@heroicons/react/20/solid";

export default async function Home() {
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

  return (
    <div className="text-white flex flex-col gap-1 items-start mt-[4%] sm:mt-[2%] md:mt-[1%] p-4 pt-0">
      <div className="pl-3">
        <span
          className="text-[10vw] md:text-[8vw] lg:text-[45px] leading-[12vw] md:leading-[8vw] lg:leading-[70px] text-left font-karla font-bold"
          style={{
            WebkitTextFillColor: 'black',
            WebkitTextStrokeWidth: '1.5px',
            WebkitTextStrokeColor: '#8A63D2',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          The ultimate Farcaster hackathon
        </span>
        <p className="text-left text-sm md:text-base lg:text-lg max-w-[60%] pl-1">
          The strength of the Farcaster developer communities depends upon education and community interaction. FarHack runs self-serve hackathon software and in-person hackathons in service of that community.
        </p>
      </div>
      <div className="ml-4">
        <Hackathons />
      </div>
    </div>
  );
}