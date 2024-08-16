/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { getHackathon } from '@/app/lib/fetchers';
import HackathonNav from '@/app/components/hackathon-nav';
import { CalendarIcon, ClipboardIcon, DocumentTextIcon, TicketIcon } from '@heroicons/react/20/solid';
import BuyTicketsModal from '@/app/components/buy-tickets-modal';
import { auth } from '@/auth';
import { db } from '@/kysely';

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

    const session = await auth();
    const user = await db.selectFrom('users').selectAll().where('name', '=', session?.user?.name ?? "").executeTakeFirst();
    const tickets = await db.selectFrom('tickets').selectAll().execute();
    const kampungTickets = tickets.filter(ticket => ticket.hackathon_id === 3);
    const userHasTicket = kampungTickets.some(ticket => Number(ticket.user_id) === Number(user?.id ?? 0));
    const ticketsLeft = 70 - kampungTickets.length;

    const startDate = new Date(hackathon.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const endDate = new Date(hackathon.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    const schedule = [
        { date: '9/15', info: 'Daytime: Hackers and partners arrive at the village\n6pm - 8pm: Community dinner\n8pm - 12am: Opening party' },
        { date: '9/16', info: '10am - 12pm: Intro and speakers\n12pm - 1pm: Outdoor lunch\n1pm - 4pm: Workshop sessions\n4pm - night: Free working time' },
        { date: '9/17', info: '10am - 11am: State of Farcaster by Dylan\n11am - 12pm: Hackathon kickoff\n12pm - 1pm: Lunch\n1pm - 6pm: Team creation + hacking\n6pm - 10pm: Hackathon happy hour' },
        { date: '9/18', info: '10am - 12pm: Workshops\n12pm - 1pm: Lunch\n1pm - 6pm: Hacking time' },
        { date: '9/19', info: '10am - 12pm: Workshops\n12pm - 1pm: Lunch\n1pm - 11:59pm: Submissions due' },
        { date: '9/20', info: '9am - 12pm: Award ceremony\n12pm - 6pm: Day 1 of ETHGlobal' },
        { date: '9/21', info: '11am - 8pm: Explore Singapore\n8pm - 12am: Dinner and hang out' },
        { date: '9/22', info: '11am - 8pm: Explore Singapore\n8pm - 12am: Final night party' },
        { date: '9/23', info: '10am - 12pm: Hackers and partners leave the village' },
    ];

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
                        <BuyTicketsModal user={user} hasTicket={userHasTicket} ticketsLeft={ticketsLeft} />
                        <div className="mt-4 max-w-[75%]">
                            <div className="flex flex-row gap-2 items-center mb-1.5">
                                <CalendarIcon className="w-4" />
                                <p className="text-lg font-medium">Schedule</p>
                            </div>
                            <div className="flex overflow-x-auto gap-4 scrollbar-hide max-w-full">
                                {schedule.map((item, index) => (
                                    <div
                                        key={index}
                                        className="min-w-[250px] flex-shrink-0 bg-[#3a3a3a] p-4 rounded-lg"
                                    >
                                        <p className="text-lg font-medium">{item.date}</p>
                                        <p className="mt-2 whitespace-pre-wrap">{item.info}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 max-w-[75%]">
                            <div className="flex flex-row gap-2 items-center mb-1.5">
                                <DocumentTextIcon className="w-4" />
                                <p className="text-lg font-medium">Details</p>
                            </div>
                            <p className="text-lg">
                                All prices are in USD and are per person. Priority tickets include full stay and the most comfortable accommodation. Standard tickets will also be available at a later date to offer more flexible options for those looking to attend for part of the time. Hackers will stay at our luxurious village in Singapore.
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