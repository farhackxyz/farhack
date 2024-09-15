/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { getHackathon } from '@/app/lib/fetchers';
import HackathonNav from '@/app/components/hackathon-nav';
import BuyTicketsModal from '@/app/components/buy-tickets-modal';
import { auth } from '@/auth';
import { db } from '@/kysely';

export default async function FarhackKampung2024Page() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const slug = pathname?.split('/')[2] ?? "";

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
    const kampungPriorityTickets = kampungTickets.filter(ticket => ticket.ticket_type === 'priority');
    const kampungDayTickets = kampungTickets.filter(ticket => ticket.ticket_type === 'day');
    const userHasPriorityTicket = kampungTickets.some(ticket => Number(ticket.user_id) === Number(user?.id ?? 0) && ticket.ticket_type === 'priority');
    const userHasDayTicket = kampungTickets.some(ticket => Number(ticket.user_id) === Number(user?.id ?? 0) && ticket.ticket_type === 'day');
    const priorityTicketsLeft = 70 - kampungPriorityTickets.length;
    const dayTicketsLeft = 100 - kampungPriorityTickets.length;

    const startDate = new Date(hackathon.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const endDate = new Date(hackathon.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="pt-[10%] md:pt-[5%]">
            <div className="text-white flex flex-col gap-1 items-start pl-[7.5%] md:pl-[4.5%]">
                <div className="flex flex-row flex-wrap md:flex-nowrap justify-between w-full mt-8 ml-1 mr-1">
                    <div className="flex flex-col mt-7 md:mt-0 mb-10 md:mb-0 md:w-1/2 gap-2 mr-[15%]">
                        <div className="flex flex-col gap-1 items-start">
                            <p className="text-4xl font-medium">FarHack Kampung</p>
                            <p>{startDate} - {endDate}</p>
                        </div>
                        <p className="mt-2 text-xl font-normal text-white/95 max-w-[60%]">
                            {hackathon.description}
                        </p>
                        <div className="mt-10 max-w-[75%]">
                            <div className="flex flex-row gap-2 items-center mb-2.5">
                                <p className="text-xl font-medium">
                                    <span className="text-2xl font-bold">Sold Out:</span> Kampung Priority Pass: $750
                                </p>
                            </div>
                            <div className="flex flex-row gap-8 items-start text-lg">
                                <div className="w-1/2">
                                    <p><b>Stay at:</b><br />- Luxury Villa at Singapore National Resort and Golf Course<br />- Full Kitchen, Pool access and more<br />- 8 nights and 9 days<br /></p>
                                </div>
                                <div className="w-1/2">
                                    <p><b>Access to:</b><br />- FarHack<br />- ETHGlobal<br />- Ethereum Singapore<br /></p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-7 max-w-[75%]">
                            <div className="flex flex-row gap-2 items-center mb-2.5">
                                <p className="text-xl font-medium">FarHack Day Pass: $20</p>
                            </div>
                            <p className="text-lg mb-5">Access to FarHack</p>
                            {!userHasPriorityTicket ? (
                                <BuyTicketsModal user={user} hasTicket={userHasDayTicket} ticketsLeft={dayTicketsLeft} ticketType='day' />
                            ) : null}
                        </div>
                    </div>
                    <div className="hidden md:flex flex-col md:w-1/2 gap-2">
                        <img src={hackathon.square_image} alt={`${hackathon.name} Hackathon`} loading="lazy" className="rounded-lg w-[75%]" />
                    </div>
                </div>
            </div>
        </div>
    );
}