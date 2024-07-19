/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { db } from '@/kysely';
import { headers } from 'next/headers';

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
        <div className="pt-5">
            <div className="text-white flex flex-col gap-1 items-start pt-5 pl-[3%]">
                <div className="flex flex-row gap-4 items-center mt-[3.5%]">
                    <img src={hackathon.square_image} alt={`${hackathon?.name} Hackathon`} loading="lazy" className="rounded w-[4%]" />
                    <p className="text-2xl font-medium">{hackathon?.name ? `${hackathon.name} Hackathon` : 'this hackathon'}</p>
                </div>
                <div className="w-[98%] border border-1 border-white rounded-md p-5 mt-5 flex flex-col items-center">
                    <p className="font-medium"><span className="font-semibold text-lg">Create</span> or join a team to get started!</p>
                </div>
                <div className="pt-10 flex flex-col gap-2 items-start">
                    <p className="text-3xl font-medium">Schedule</p>
                    <div className="text-lg">
                        <p>Dates: {startDate} - {endDate}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}