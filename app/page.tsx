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
    <div className={`text-white flex flex-col gap-1 items-center mt-[17%] sm:mt-[12%] md:mt-[7%] p-4`}>
      <span
      className="text-[8vw] md:text-[6vw] lg:text-[67.1653px] leading-[10vw] md:leading-[6.5vw] lg:leading-[79px] text-center font-karla font-bold"
      style={{
        WebkitTextFillColor: 'black',
        WebkitTextStrokeWidth: '1.5px',
        WebkitTextStrokeColor: '#8A63D2',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      The ultimate Farcaster hackathon
    </span>
      {/* Temporary Limited Tickets banner for FarHack Kampung */}
      <div className="mt-4 md:mt-8 w-full flex justify-center px-2">
        <a
          href="/hackathons/farhack-kampung-2024"
          className="flex items-center rounded-full bg-[#58499B] px-3 py-2 text-white text-sm font-medium gap-2 md:px-4 md:py-2.5 md:text-base"
        >
          <TicketIcon className="w-5 text-white md:w-7" aria-hidden="true" />
          <p className="text-base md:text-xl flex items-center gap-1 md:gap-2">
            <span className="font-semibold whitespace-nowrap">Limited</span>
            <span className="whitespace-nowrap">Buy tickets to FarHack Kampung</span>
          </p>
        </a>
      </div>
      <Hackathons />
    </div>
  );
}