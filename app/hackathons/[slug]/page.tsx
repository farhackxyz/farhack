/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { db } from '@/kysely';
import { headers } from 'next/headers';
import HackathonNav from '@/app/components/hackathon-nav';

export default async function HackathonBySlugPage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const pathnameParts = pathname.split('/');
    const slug = pathnameParts[2];

    const hackathon = await db.selectFrom('hackathons')
        .selectAll()
        .where('slug', '=', slug)
        .executeTakeFirst();

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
        <div className="pt-10 md:pt-5">
            <div className="text-white flex flex-col gap-1 items-start pl-[7.5%] md:pl-[4.5%]">
                <HackathonNav hackathon={hackathon} />
                <div className="flex flex-row flex-wrap md:flex-nowrap justify-between w-full mt-8 ml-1 mr-1">
                    <div className="flex flex-col md:w-1/2 gap-2">
                        <img src={hackathon.square_image} alt={`${hackathon?.name} Hackathon`} loading="lazy" className="rounded-lg w-[75%]" />
                    </div>
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
                    </div>
                </div>
            </div>
        </div>
    );
}