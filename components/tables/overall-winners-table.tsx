import { OverallWinner } from "@/lib/types";
import { karla, overallWinners } from "@/lib/utils";

export default function OverallWinnersTable() {
    return (
        <div className={`bg-white/90 rounded-md max-w-[90%] mt-10 ${karla.className}`}>
            <p className="text-black font-medium pl-3 pt-3 pb-2">Overall Winners</p>
            <hr className="border-black" />
            <table className="w-full text-left rounded-md overflow-x-scroll">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Place</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Team</th>
                    </tr>
                </thead>
                <tbody className="border-collapse border-t border-black">
                    {overallWinners.map((winner: OverallWinner) => {
                        return (
                            <tr key={winner.place} className="border-b border-black">
                                <td className="px-4 py-2">{winner.place}</td>
                                <td className="px-4 py-2">
                                    <a target="_blank" href={winner.project_link} className="underline">{winner.name}</a>
                                </td>
                                <td className="px-4 py-2">{winner.description}</td>
                                <td className="px-4 py-2">
                                    {winner.team.map((name, index) => {
                                        return (
                                            <span key={index} className="mr-2">
                                                <a target="_blank" href={`https://warpcast.com/${name}`} className="underline">@{name}</a>
                                                {index !== winner.team.length - 1 ? ',' : ''}
                                            </span>
                                        )
                                    })}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className="flex justify-center mt-2 mb-4 pb-2">
                <a target="_blank" href="https://beta.events.xyz/h/477226fc/teams" className="underline">View all teams and projects</a>
            </div>
        </div>
    );
}