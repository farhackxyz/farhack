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
      <div className="pt-7 md:pt-12">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center md:justify-start items-center md:items-start gap-10">
          {hackathons.map((hackathon) => (
            <HackathonListItem key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      </div>
    );
  }
  // TODO: change all static loading so some sort of icon at least
  return <div>Loading...</div>;
}