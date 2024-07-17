/* eslint-disable @next/next/no-img-element */
import { karla } from "../lib/utils";
import FarhackLogo from "../components/icons/farhack-logo";
import WarpcastIcon from "../components/icons/warpcast-icon";
import GithubIcon from "../components/icons/github-icon";
import SignInWithFarcaster from "../components/sign-in-with-farcaster";

type Hackathon = {
  name: string;
  status: string;
  image: string;
  link: string;
};

const hackathons: Hackathon[] = [
  {
    name: "EdCon",
    status: "upcoming",
    image: "https://i.imgur.com/UrNV4yL.png",
    link: "https://example.com/edcon",
  },
  {
    name: "FarHack at FarCon",
    status: "previous",
    image: "https://i.imgur.com/m2qIvVE.png",
    link: "/past-events/farhack-at-farcon-2024",
  },
];

function HackathonListItem({ hackathon }: { hackathon: Hackathon }) {
  const typeFiltered = hackathons.filter((h) => h.status === hackathon.status);
  const indexInType = typeFiltered.findIndex((h) => h.name === hackathon.name);

  return (
    <div className="m-auto relative">
      <a href={hackathon.link} target="_blank" rel="noopener noreferrer">
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

function HackathonList() {
  return (
    <div className="pt-5">
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hackathons.map((hackathon) => (
          <HackathonListItem key={hackathon.name} hackathon={hackathon} />
        ))}
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className={`flex flex-col gap-4 p-4 min-h-screen bg-black ${karla.className}`}>
      <div className="absolute top-6 left-8 flex flex-row gap-4 items-center">
        <FarhackLogo width={35} height={35} />
        <p className={`text-white text-2xl mr-4 ${karla.className}`}>FarHack</p>
      </div>
      <div className="absolute top-4 right-8">
        <SignInWithFarcaster />
      </div>
      <div className={`text-white ${karla.className} flex flex-col gap-1 items-start mt-[15%] sm:mt-[13%] md:mt-[6.5%] ml-[1.5%]`}>
        <p className="text-2xl md:text-3xl font-semibold">Hackathons</p>
        <HackathonList />
      </div>
      <div className="pl-5 pb-10 flex flex-row gap-4 items-center absolute bottom-0">
        <a target="_blank" href="https://warpcast.com/~/channel/farhack">
          <WarpcastIcon />
        </a>
        <a target="_blank" href="https://github.com/dylsteck/farhack">
          <GithubIcon />
        </a>
      </div>
    </div>
  );
}