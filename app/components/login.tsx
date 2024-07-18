/* eslint-disable @next/next/no-img-element */

import { images } from "../lib/utils";

type Hackathon = {
  name: string;
  status: string;
  id: string;
  image: string;
};

export const hackathons: Hackathon[] = [
  {
    name: "EdCon",
    status: "upcoming",
    id: "edcon-2024",
    image: images.find((image) => image.alt === "Edcon 2024 Hackathon Powered by FarHack Square Picture")?.src ?? "",
  },
  {
    name: "FarHack at FarCon",
    status: "previous",
    id: "farhack-at-farcon-2024",
    image: images.find((image) => image.alt === "FarHack at FarCon Announcement Frame Square Picture")?.src ?? ""
  },
];

function HackathonListItem({ hackathon }: { hackathon: Hackathon }) {
  const typeFiltered = hackathons.filter((h) => h.status === hackathon.status);
  const indexInType = typeFiltered.findIndex((h) => h.name === hackathon.name);

  return (
    <div className="m-auto relative">
      <a href={`/hackathons/${hackathon.id}`}>
        {indexInType === 0 && (
          <div className="mb-3.5 min-w-[100%]">
            <p className="text-left text-white text-lg font-medium">
              {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
            </p>
          </div>
        )}
        <div className="flex flex-col gap-2 items-center max-w-[300px] w-full">
          <img
            src={hackathon.image}
            alt={hackathon.name}
            loading="lazy"
            className={`rounded max-w-[100%] ${indexInType !== 0 ? "mt-7" : ""}`}
          />
          <p className="text-white p-2 w-full text-center">{hackathon.name}</p>
        </div>
      </a>
    </div>
  );
}

export default function Login() {
  return (
    <div className={`text-white flex flex-col gap-1 items-start mt-[15%] sm:mt-[13%] md:mt-[6.5%] ml-[1.5%] p-4`}>
      <p className="text-2xl md:text-3xl font-semibold">Hackathons</p>
      <div className="pt-5">
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hackathons.map((hackathon) => (
          <HackathonListItem key={hackathon.name} hackathon={hackathon} />
        ))}
      </div>
    </div>
    </div>
  );
}