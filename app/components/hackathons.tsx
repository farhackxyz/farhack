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

function formatDate(date: Date) {
  return date.toLocaleString('default', { month: 'short', year: 'numeric' });
}

function HackathonListItem({ hackathon }: { hackathon: Hackathon }) {
  const now = new Date();
  const isLive = now >= new Date(hackathon.start_date) && now <= new Date(hackathon.end_date);
  const dateLabel = isLive ? (
    <span className="flex items-center justify-center rounded-full bg-red-600 px-2.5 py-1 text-white">
      Live
    </span>
  ) : (
    <span className="rounded-full bg-gray-200 px-2.5 py-1 text-black">
      {formatDate(hackathon.start_date)}
    </span>
  );

  return (
    <div className="relative m-auto flex flex-col items-center w-[300px]">
      <a href={`/hackathons/${hackathon.slug}`}>
        <img
          src={hackathon.square_image}
          alt={hackathon.name}
          loading="lazy"
          className="rounded-xl w-full"
        />
        <div className="absolute bottom-0 w-full bg-black bg-opacity-70 p-2 text-center text-white rounded-b-xl">
          {hackathon.name}
        </div>
        <div className="absolute top-0 right-0 m-2">
          {dateLabel}
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
      <div className="flex flex-col gap-4 items-start pt-8">
        <p className="text-2xl font-bold">Hackathons</p>
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 items-start">
          {hackathons.map((hackathon) => (
            <div key={hackathon.id} className="snap-center">
              <HackathonListItem hackathon={hackathon} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return <div className="flex justify-center items-center h-full">Loading...</div>;
}