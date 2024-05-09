import { Prize } from "@/lib/types";
import { karla, prizes } from "@/lib/utils";

export default function PrizesTable() {
    return (
        <div className={`bg-white/90 rounded-md border-2 border-black max-w-[90%] mt-10 mb-10 ${karla.className}`}>
            <p className="text-black font-medium pl-3 pt-3 pb-2">Prizes</p>
            <table className="w-full text-left rounded-md border-collapse border-t border-black overflow-x-scroll">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border-b border-black">Company</th>
                        <th className="px-4 py-2 border-b border-black">Prizes</th>
                        <th className="px-4 py-2 border-b border-black">Amounts</th>
                        <th className="px-4 py-2 border-b border-black">Winners</th>
                    </tr>
                </thead>
                <tbody>
                    {prizes.map((prize: Prize, index: number) => {
                        const borderClass = index === 0 ? '' : 'border-t border-black';
                        return (
                            <tr key={prize.company} className={borderClass}>
                                <td className="px-4 py-2">
                                    <a href={prize.company_link} target="_blank" className="underline">
                                        {prize.company}
                                    </a>
                                </td>
                                {prize.prizes_link.length > 0 ? (
                                    <td className="px-4 py-2">
                                        <a href={prize.prizes_link} target="_blank" className="underline">
                                            {prize.prizes}
                                        </a>
                                    </td>
                                ) : (
                                    <td className="px-4 py-2">{prize.prizes}</td>
                                )}
                                <td className="px-4 py-2">{prize.amounts}</td>
                                {prize.winners.length > 0 ? (
                                    <td className="px-4 py-2 max-w-[200px] overflow-hidden text-ellipsis">
                                        <div className="flex flex-wrap gap-2">
                                            {prize.winners.map((name, index) => (
                                                <span key={index} className="mr-2 whitespace-nowrap">
                                                    <a
                                                        target="_blank"
                                                        href={`https://warpcast.com/${name}`}
                                                        className="underline"
                                                    >
                                                        @{name}
                                                    </a>
                                                    {prize.winners.length > 0 && index !== prize.winners.length - 1 ? ',' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                ) : (
                                    <td className="px-4 py-2">TBD</td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}