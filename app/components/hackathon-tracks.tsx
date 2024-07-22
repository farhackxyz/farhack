/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { db } from '@/kysely';
import HackathonNav from '@/app/components/hackathon-nav';
import { Track } from '@/app/lib/types';
import { AcademicCapIcon } from '@heroicons/react/20/solid';

export default async function HackathonTracks({ slug }: { slug: string }) {

    if (!slug || slug.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>Invalid hackathon slug. <a href="/" className="underline">Return to home</a></p>
            </div>
        );
    }

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

    const startDate = new Date(hackathon.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const endDate = new Date(hackathon.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    const tracks = hackathon.tracks as unknown as Track[];

    return (
        <div className="pt-5">
            <div className="text-white flex flex-col gap-1 items-start pl-[7.5%] md:pl-[4.5%]">
                <HackathonNav hackathon={hackathon} />
                {tracks ?
                <>
                    <p className="text-2xl font-semibold mt-5 mb-3">Tracks</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full pr-[6.5%] md:pr-[4.5%]">
                        {tracks.map((item: Track) => {
                            return (
                                <div key={item.id} className="flex flex-col justify-between gap-1 items-start p-4 rounded-md bg-baseGrey hover:bg-baseGrey text-white transition-colors duration-200">
                                    <div className="flex items-center gap-2">
                                        <AcademicCapIcon className="h-6 w-6 text-white" />
                                        <p className="font-semibold">{item.name}</p>
                                    </div>
                                    <p className="text-sm whitespace-pre-line mt-2">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </>  : <></>
                }
            </div>
        </div>
    );
}