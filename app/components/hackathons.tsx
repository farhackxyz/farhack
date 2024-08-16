/* eslint-disable @next/next/no-img-element */
import { type HackathonsTable, db } from "@/kysely";
import { TicketIcon } from "@heroicons/react/20/solid";

interface Hackathon {
  id: number;
  name: string;
  description: string;
  slug: string;
  square_image: string;
  start_date: Date;
  end_date: Date;
  created_at: Date;
}

function HackathonListItem({ hackathon }: { hackathon: Hackathon }) {
  const now = new Date();
  const isLive = now >= new Date(hackathon.start_date) && now <= new Date(hackathon.end_date);
  const dateLabel = hackathon.name === 'FarHack Kampung' ? (
    <span className="flex flex-row gap-1 items-center rounded-xl bg-[#58499B] text-white px-2.5">
      <TicketIcon className="w-3 text-white" aria-hidden="true" />
      Buy Tickets
    </span>
  ) : (hackathon.id !== 3 && isLive) ? (
    <span className="flex items-center rounded-xl bg-white px-2.5 text-black">
      <span className="w-2.5 h-2.5 bg-red-600 rounded-full mr-1.5"></span>
      Live
    </span>
  ) : (
    <span className="rounded-xl bg-white px-2.5 text-black">
      {hackathon.start_date.toLocaleString('default', { month: 'long', year: 'numeric' })}
    </span>
  );

  return (
    <div className="m-auto relative">
      <a href={`/hackathons/${hackathon.slug}`}>
        <div className="flex flex-col gap-2 items-center max-w-[300px] w-full">
          <div className="flex justify-between w-full">
            {dateLabel}
          </div>
          <div className="relative">
            <img
              src={hackathon.square_image}
              alt={hackathon.name}
              loading="lazy"
              className="rounded-xl max-w-[100%]"
            />
            <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-50 p-2 text-center text-white">
              {hackathon.name}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default async function Hackathons() {
  const hackathons: Hackathon[] = await db.selectFrom("hackathons").selectAll().execute();
  if (hackathons) {
    hackathons.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

    return (
      <div className={`text-white flex flex-col gap-1 items-center mt-[17%] sm:mt-[12%] md:mt-[7%] p-4`}>
        <span
          className="text-[8vw] md:text-[6vw] lg:text-[67.1653px] leading-[79px] text-center font-karla font-bold"
          style={{
            WebkitTextFillColor: 'black',
            WebkitTextStrokeWidth: '1.5px',
            WebkitTextStrokeColor: '#8A63D2',
            textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          The ultimate Farcaster hackathon
        </span>

        <div className="mt-4 md:mt-8 w-full flex justify-center">
          <a
            href="/hackathons/farhack-kampung-2024"
            className="flex items-center rounded-full bg-[#58499B] px-4 py-2.5 text-white text-sm font-medium gap-2"
          >
            <TicketIcon className="w-7 text-white" aria-hidden="true" />
            <p className="text-xl"><span className="font-semibold pr-2.5">Limited</span> Buy tickets to FarHack Kampung</p>
          </a>
        </div>

        <div className="pt-7 md:pt-12">
          <div className="flex flex-wrap justify-center items-center gap-10">
            {hackathons.map((hackathon) => (
              <HackathonListItem key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
}