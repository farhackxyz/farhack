import { karla, lora } from "@/lib/utils";
import Nav from "./nav";
import OverallWinnersTable from "./tables/overall-winners-table";
import PrizesTable from "./tables/prizes-table";

export default function Info() {
    return (
        <div className="visible md:w-1/2 min-h-[100%] h-auto bg-black/95 overflow-y-scroll">
            <div className="pl-10 flex-col items-center justify-center mb-5 md:mb-0">
                <Nav />
                <img
                    src="https://i.imgur.com/J1Lch5m.png"
                    alt="The official FarHack at FarCon partners banner"
                    className="max-w-[90%] h-auto rounded-lg"
                />
                <p className={`pt-5 text-white font-light ${karla.className} max-w-[90%]`}>
                    Thanks so much to everyone who attended the inaugural FarHack! I'm thrilled that we were able to
                    spend a weekend uplifting and celebrating developers, and the quality of projects built was off the
                    charts. Hope to see you at another FarHack soon!
                </p>
                <div className="mt-1">
                    <a
                        target="_blank"
                        href="https://warpcast.com/dylsteck.eth"
                        className="flex flex-row items-center gap-2 max-w-[50%] md:max-w-[30%]"
                    >
                        <img
                            src="https://i.imgur.com/Gk94uKf.png"
                            alt="dylsteck.eth's pfp"
                            className="w-5 h-5 rounded-full"
                        />
                        <p className={`text-white font-medium ${karla.className}`}>- dylsteck.eth</p>
                    </a>
                </div>
                <div className="hidden md:block">
                    <OverallWinnersTable />
                    <PrizesTable />
                </div>
            </div>
        </div>
    );
}