/* eslint-disable @next/next/no-img-element */
import { type HackathonsTable, db } from "@/kysely";

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
  return (
    <div className="m-auto relative">
      <a href={`/hackathons/${hackathon.slug}`}>
        <div className="flex flex-col gap-2 items-center max-w-[300px] w-full">
          <img
            src={hackathon.square_image}
            alt={hackathon.name}
            loading="lazy"
            className="rounded max-w-[100%]"
          />
          <p className="text-white p-2 w-full text-center">{hackathon.name}</p>
        </div>
      </a>
    </div>
  );
}

export default async function Hackathons() {
  const hackathons: Hackathon[] = await db.selectFrom("hackathons").selectAll().execute();
  if (hackathons) {
    const currentDate = new Date();
    const upcomingHackathons = hackathons.filter(hackathon => new Date(hackathon.start_date) > currentDate);
    const previousHackathons = hackathons.filter(hackathon => new Date(hackathon.end_date) < currentDate);

    return (
      <div
        className={`text-white flex flex-col gap-1 items-start mt-[15%] sm:mt-[13%] md:mt-[6.5%] ml-[1.5%] p-4`}
      >
        <p className="text-2xl md:text-3xl font-semibold">Hackathons</p>
        <div className="pt-5">
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-lg md:text-xl font-medium pb-2">Upcoming</p>
              <div className="grid gap-10 grid-cols-1">
                {upcomingHackathons.map((hackathon: Hackathon) => (
                  <HackathonListItem key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-lg md:text-xl font-medium pb-2">Previous</p>
              <div className="grid gap-10 grid-cols-1">
                {previousHackathons.map((hackathon: Hackathon) => (
                  <HackathonListItem key={hackathon.id} hackathon={hackathon} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
}