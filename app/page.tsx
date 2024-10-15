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
    <div className="text-white flex flex-col gap-4 items-start mt-[4%] sm:mt-[2%] md:mt-[1%] p-4 pt-0">
      <div className="pl-3">
        <span
          className="text-[10vw] sm:text-[9vw] md:text-[7vw] lg:text-[42px] leading-[12vw] sm:leading-[10vw] md:leading-[8vw] lg:leading-[56px] text-left font-karla font-bold"
          style={{
            WebkitTextFillColor: 'black',
            WebkitTextStrokeWidth: '1px',
            WebkitTextStrokeColor: '#8A63D2',
            textShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
          }}
        >
          The ultimate Farcaster hackathon
        </span>
        <p className="text-left text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] max-w-[80%] md:max-w-[70%] lg:max-w-[60%] mt-2">
          The strength of the Farcaster developer communities depends upon education and community interaction. FarHack runs self-serve hackathon software and in-person hackathons in service of the community.
        </p>
      </div>
      <div className="ml-4">
        <Hackathons />
      </div>
    </div>
  );
}