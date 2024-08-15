/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { getHackathon } from '@/app/lib/fetchers';
import HackathonNav from '@/app/components/hackathon-nav';
import { CalendarIcon, ClipboardIcon, DocumentTextIcon, TicketIcon } from '@heroicons/react/20/solid';

export default async function FarhackKampung2024Page() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const pathnameParts = pathname.split('/');
    const slug = pathnameParts[2];

    const hackathon = await getHackathon(slug);

    if (!hackathon) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>No data found. <a href="/" className="underline">Return to home</a></p>
            </div>
        );
    }

    const startDate = new Date(hackathon.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const endDate = new Date(hackathon.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="pt-[10%] md:pt-[5%]">
            <div className="text-white flex flex-col gap-1 items-start pl-[7.5%] md:pl-[4.5%]">
                <div className="flex flex-row flex-wrap md:flex-nowrap justify-between w-full mt-8 ml-1 mr-1">
                    <div className="flex flex-col mt-7 md:mt-0 mb-10 md:mb-0 md:w-1/2 gap-2 mr-[15%]">
                        <div className="flex flex-col gap-1 items-start">
                            <p className="text-4xl font-medium">
                                {hackathon.name}
                            </p>
                            <p>
                                {startDate} - {endDate}
                            </p>
                        </div>
                        <p className="mt-2 text-xl font-normal text-white/95">
                            {hackathon.description}
                        </p>
                        <div className="max-w-[75%] flex flex-row gap-2 items-center justify-center text-center px-3 py-2.5 rounded-xl bg-[#58499B] mt-4 cursor-pointer">
                            <TicketIcon className="w-5" />
                            <p>Buy Tickets</p>
                        </div>
                        <div className="mt-4 max-w-[75%]">
                            <div className="flex flex-row gap-2 items-center mb-1.5">
                                <CalendarIcon className="w-4" />
                                <p className="text-lg font-medium">Schedule</p>
                            </div>
                            <div>
                                <table className="table-auto text-left w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border border-white">Date</th>
                                            <th className="px-4 py-2 border border-white">Information</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-white rounded-tl-lg rounded-bl-lg px-4 py-2">9/15</td>
                                            <td className="border border-white px-4 py-2">Daytime: Hackers and partners arrive at the village<br />6pm - 8pm: Community dinner<br />8pm - 12am: Opening party</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-white px-4 py-2">9/16</td>
                                            <td className="border border-white px-4 py-2">10am - 12pm: Intro and speakers<br />12pm - 1pm: Outdoor lunch<br />1pm - 4pm: Workshop sessions<br />4pm - night: Free working time</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-white px-4 py-2">9/17</td>
                                            <td className="border border-white px-4 py-2">10am - 11am: State of Farcaster by Dylan<br />11am - 12pm: Hackathon kickoff<br />12pm - 1pm: Lunch<br />1pm - 6pm: Team creation + hacking<br />6pm - 10pm: Hackathon happy hour</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-white px-4 py-2">9/18</td>
                                            <td className="border border-white px-4 py-2">10am - 12pm: Workshops<br />12pm - 1pm: Lunch<br />1pm - 6pm: Hacking time</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-white px-4 py-2">9/19</td>
                                            <td className="border border-white px-4 py-2">10am - 12pm: Workshops<br />12pm - 1pm: Lunch<br />1pm - 11:59pm: Submissions due</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-white px-4 py-2">9/20</td>
                                            <td className="border border-white px-4 py-2">9am - 12pm: Award ceremony<br />12pm - 6pm: Day 1 of ETHGlobal</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-white px-4 py-2">9/21</td>
                                            <td className="border border-white px-4 py-2">11am - 8pm: Explore Singapore<br />8pm - 12am: Dinner and hang out</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-white px-4 py-2">9/22</td>
                                            <td className="border border-white px-4 py-2">11am - 8pm: Explore Singapore<br />8pm - 12am: Final night party</td>
                                        </tr>
                                        <tr>
                                            <td className="border border-white rounded-br-lg rounded-tr-lg px-4 py-2">9/23</td>
                                            <td className="border border-white px-4 py-2">10am - 12pm: Hackers and partners leave the village</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-4 max-w-[75%]">
                            <div className="flex flex-row gap-2 items-center mb-1.5">
                                <DocumentTextIcon className="w-4" />
                                <p className="text-lg font-medium">Details</p>
                            </div>
                            <p className="text-lg">
                                All prices are in USD and are per person. Priority tickets include full stay and the most comfortable accommodation. Standard tickets will also be available at a later date to offer more flexible options for those looking to attend for part of the time. Hackers will stay at our luxurious village at Singapore Golf and Country Club.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:w-1/2 gap-2">
                        <img src={hackathon.square_image} alt={`${hackathon?.name} Hackathon`} loading="lazy" className="rounded-lg w-[75%]" />
                    </div>
                </div>
            </div>
        </div>
    );
}