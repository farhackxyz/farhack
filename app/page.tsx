import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HomeCarousel } from "./components/home-carousel";
import Hackathons from "./components/hackathons";

export default function Home() {

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden lg:block w-full h-full overflow-y-hidden">
        <HomeCarousel />
      </div>
      <div className="flex items-center justify-center w-full md:mt-0">
        <div className="mx-auto grid w-[350px] gap-6 h-full overflow-hidden">
          <div className="flex flex-col gap-1 items-start mt-[20%] md:mt-[50%]">
            <h1 className="text-4xl font-bold text-white">FarHack</h1>
            <span
              className="text-[7vw] md:text-[8vw] lg:text-[32px] leading-[7vw] md:leading-[6.5vw] lg:leading-[32px] text-left font-karla font-bold mt-3"
              style={{
                WebkitTextFillColor: "black",
                WebkitTextStrokeWidth: "1.5px",
                WebkitTextStrokeColor: "#8A63D2",
                textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              The ultimate Farcaster hackathon
            </span>
            <div className="mt-[15%]">
              <Hackathons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}