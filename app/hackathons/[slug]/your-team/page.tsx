/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { db, sql } from '@/kysely';
import { auth } from '@/auth';
import HackathonNav from '@/app/components/hackathon-nav';
import InviteButton from '@/app/components/invite-button';
import CreateTeamButton from '@/app/components/create-team-button';
import DeleteOrLeaveTeamButton from '@/app/components/delete-or-leave-team-button';
import EditTeamButton from '@/app/components/edit-team-button';
import { redirect } from 'next/navigation';
import { BASE_URL } from '@/app/lib/utils';
import SubmitTeamButton from '@/app/components/submit-team-button';
import { getHackathon } from '@/app/lib/fetchers';
import Error from '@/app/components/error';
import { createTeam, handleDeleteTeam, handleGenerateInvite, handleLeaveTeam, handleSaveTeam, handleSubmitTeam } from '@/app/lib/server/teams';

export default async function YourTeamPage() {
    const headerList = headers();
    const slug = (headerList.get("x-current-path") as string).split('/')[2];
    const session = await auth();

    if (!session?.user) return <Error message={`You are not logged in.`} />

    const user = await db.selectFrom('users').selectAll().where('name', '=', session.user.name ?? "").executeTakeFirst();
    if (!user) return <Error message={`You are not logged in.`} />

    const hackathon = await getHackathon(slug);
    if (!hackathon) return <Error message={`Hackathon with slug ${slug} not found.`} />

    const team = await db.selectFrom('teams')
        .selectAll()
        .where(sql<boolean>`fids @> ARRAY[${user.id}]::int[]`)
        .where('hackathon_id', '=', hackathon.id)
        .executeTakeFirst();

    let teamMembers: any = [];
    if (team) {
        teamMembers = await db.selectFrom('users')
            .selectAll()
            .where('id', 'in', team.fids)
            .execute();
    }

    const submissionDeadline = new Date(hackathon.end_date);
    const now = new Date();
    const timeRemaining = submissionDeadline.getTime() - now.getTime();
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesRemaining = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));

    const callHandleGenerateInvite = async() => {
        return await handleGenerateInvite(user?.id, team?.id ?? 0, hackathon.slug);
    }

    return (
        <div className="">
            <div className="text-white flex flex-col gap-1 items-start pl-[2.5%] pr-[4.5%]">
                <HackathonNav hackathon={hackathon} />
                <div className="mt-5 mb-3 flex flex-col items-start">
                    <p className="text-2xl font-semibold">Your Team</p>
                    <p className="text-lg">Time to submission deadline: {daysRemaining} days, {hoursRemaining} hours, {minutesRemaining} minutes</p>
                </div>
                {team ? (
                    <>
                        <div className="p-4 rounded-md bg-baseGrey text-white transition-colors duration-200 mb-3 w-full max-w-md">
                            <p className="font-semibold text-lg">{team.name}</p>
                            <div className="text-sm mt-2">
                                <p>{team.description}</p>
                                {(team.embeds as unknown as any[]).length > 0 && (
                                    <div className="mt-2">
                                        {(team.embeds as unknown as any[]).map((embed: any, index: any) => embed.type === 'image' && (
                                            <img key={index} src={embed.url} alt={`embed-${index}`} className="w-full h-32 object-cover rounded-md mb-2" />
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
                        <p className="text-2xl">Actions</p>
                        {!team.submitted_at ? (
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-3">
                                <InviteButton handleGenerateInvite={callHandleGenerateInvite} />
                                {team.submitted_at ? (
                                    <p className="text-sm mt-3">Submitted at: {new Date(team.submitted_at).toLocaleString()}</p>
                                ) : (
                                    <>
                                        <EditTeamButton 
                                            team={team} 
                                            hackathonEndDate={hackathon.end_date.toISOString()}
                                            handleSaveTeam={handleSaveTeam}
                                            handleSubmitTeam={handleSubmitTeam}
                                        />
                                        <SubmitTeamButton 
                                            team={team} 
                                            hackathonEndDate={hackathon.end_date.toISOString()}
                                            handleSaveTeam={handleSaveTeam}
                                            handleSubmitTeam={handleSubmitTeam}
                                        />
                                    </>
                                )}
                                <DeleteOrLeaveTeamButton 
                                    teamId={team.id} 
                                    userId={user.id} 
                                    hackathonSlug={hackathon.slug}
                                    teamMembers={teamMembers} 
                                    handleDeleteTeam={handleDeleteTeam} 
                                    handleLeaveTeam={handleLeaveTeam} 
                                />
                            </div>
                        ) : <p>Your team has been submitted! No remaining action items.</p>}
                    </>
                ) : (
                    <div className="text-white flex flex-col gap-1 items-start">
                        <p className="text-2xl font-semibold mt-5 mb-3">You are not part of any team</p>
                        <CreateTeamButton createTeam={createTeam} />
                    </div>
                )}
            </div>
        </div>
    );
}