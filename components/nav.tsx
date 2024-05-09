import { karla } from "@/lib/utils";
import WarpcastIcon from "./icons/warpcast-icon";
import FarhackLogo from "./icons/farhack-logo";
import GithubIcon from "./icons/github-icon";

export default function Nav(){
    return(
        <nav className="w-full h-16 flex items-center justify-between">
            <ul className="w-full flex flex-row gap-1 justify-between items-center mr-[10%]">
                <div className="flex flex-row gap-1 items-center">
                    <FarhackLogo width={35} height={35} />
                    <li className={`text-white text-2xl mr-4 ${karla.className}`}>
                        FarHack
                    </li>
                </div>
                <div className="flex flex-row gap-4 items-center">
                    <a target="_blank" href="https://warpcast.com/~/channel/farhack">
                        <WarpcastIcon />
                    </a>
                    <a target="_blank" href="https://github.com/dylsteck/farhack">
                    <GithubIcon />
                    </a>
                </div>
            </ul>
        </nav>
    )
}