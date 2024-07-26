/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { db, sql, createInvite } from '@/kysely';
import { auth } from '@/auth';
import HackathonNav from '@/app/components/hackathon-nav';
import InviteButton from '@/app/components/invite-button';
import CreateTeamButton from '@/app/components/create-team-button';
import DeleteOrLeaveTeamButton from '@/app/components/delete-or-leave-team-button';
import EditTeamButton from '@/app/components/edit-team-button';
import { redirect } from 'next/navigation';
import { BASE_URL } from '@/app/lib/utils';
import SubmitTeamButton from '@/app/components/submit-team-button';
import { getHackathon, getTeam } from '@/app/lib/fetchers';

export default async function TeamByIdPage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const pathnameParts = pathname.split('/');
    const slug = pathnameParts[2];
    const id = pathnameParts[4];
    const hackathon = await getHackathon(slug);
    const team = (await getTeam(id))[0];

    let teamMembers: any = [];
    if (team) {
        teamMembers = await db.selectFrom('users')
            .selectAll()
            .where('id', 'in', team.fids)
            .execute();
    }

    return (
        <div className="mt-[2.5%] ml-1">
            <div className="text-white flex flex-col gap-1 items-start pl-[4.5%] pr-[4.5%]">
                <HackathonNav hackathon={hackathon} />
                {team ? (
                    <>
                        <div className="p-4 mt-10 rounded-md bg-baseGrey text-white transition-colors duration-200 mb-3 w-full max-w-md">
                            <p className="font-semibold text-lg">{team.name}</p>
                            <div className="text-sm mt-2">
                                <p>{team.description}</p>
                                {(team.embeds as unknown as any[]).length > 0 && (
                                    <div className="mt-2">
                                        {(team.embeds as unknown as any[]).map((embed: any, index: any) => (
                                            embed.type === 'image' ? (
                                                <img key={index} src={embed.url} alt={`embed-${index}`} className="w-full h-32 object-cover rounded-md mb-2" />
                                            ) : (
                                                <div key={index} className="mb-2">
                                                    <a href={embed.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                        {embed.url}
                                                    </a>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                                {team.wallet_address && (
                                    <p className="mt-2">Wallet Address: {team.wallet_address}</p>
                                )}
                                <p className="font-semibold mt-3">Team Members:</p>
                                <ul className="list-disc pl-5">
                                    {teamMembers.map((member: any) => (
                                        <li key={member.id} className="text-sm">{member.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    
                    </>
                ) : <></>}
            </div>
        </div>
    );
}