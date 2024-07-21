/* eslint-disable @next/next/no-img-element */
import React from 'react';
import HackathonNav from '@/app/components/hackathon-nav';
import { db } from '@/kysely';
import { Team } from '@/app/lib/types';
import { UserGroupIcon } from '@heroicons/react/20/solid';

export default async function HackathonTeams({ slug }: { slug: string }) {

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

    const teams = await db.selectFrom('teams')
        .selectAll()
        .where('hackathon_id', '=', hackathon.id)
        .execute();

    if (!teams) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>No data found. <a href="/" className="underline">Return to home</a></p>
            </div>
        );
    }

    return (
        <div className="pt-5">
            <div className="text-white flex flex-col gap-1 items-start pl-[4.5%]">
                <HackathonNav hackathon={hackathon} />
                {teams ?
                <>
                    <p className="text-2xl font-semibold mt-5 mb-3">Teams</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full pr-[4.5%]">
                        {teams.map((team: any) => {
                            const coverImage = team.embeds.find((embed: any) => embed.type === 'image')?.url;
                            return (
                                <div key={team.id} className="flex flex-col justify-between gap-1 items-start p-4 rounded-md bg-baseGrey hover:bg-baseGrey text-white transition-colors duration-200">
                                    {coverImage && <img src={coverImage} alt={team.name} className="w-full h-32 object-cover rounded-md mb-2" />}
                                    <div className="flex items-center gap-2">
                                        <UserGroupIcon className="h-6 w-6 text-white" />
                                        <p className="font-semibold">{team.name}</p>
                                    </div>
                                    <p className="text-sm mt-2">{team.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </> : <></>
                }
            </div>
        </div>
    );
}