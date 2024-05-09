import { karla } from "@/lib/utils";

export default function Nav(){
    return(
        <nav className="w-full h-16 flex items-center justify-between">
            <ul className="flex flex-row gap-1 items-center">
                <li className={`text-white text-lg mr-4 ${karla.className}`}>Home</li>
                <li className={`text-white text-lg mr-4 ${karla.className}`}>
                    <a target="_blank" href="https://warpcast.com/~/channel/farhack">Warpcast</a>
                </li>
            </ul>
        </nav>
    )
}