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

export default async function YourTeamPage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const pathnameParts = pathname.split('/');
    const slug = pathnameParts[2];
    const session = await auth();

    if (!session?.user) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>You are not logged in. Log in above or <a href="/" className="underline">click here to return home</a></p>
            </div>
        );
    }

    const user = await db.selectFrom('users').selectAll().where('name', '=', session.user.name ?? "").executeTakeFirst();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>You are not logged in. Log in above or <a href="/" className="underline">click here to return home</a></p>
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

    async function createTeam(name: string, description: string = '') {
        'use server';
        const emptyJsonArray = JSON.stringify([]);
        await db.insertInto('teams').values({
            name: name,
            description: description,
            hackathon_id: hackathon?.id ?? 0,
            fids: [user?.id ?? 0],
            wallet_address: '',
            embeds: sql`${emptyJsonArray}::jsonb`
        }).execute();
    }

    async function handleGenerateInvite(): Promise<string> {
        'use server';
        const token = await createInvite(user?.id ?? 0, team?.id ?? 0);
        const shareLink = `${BASE_URL}/hackathons/${hackathon?.slug}/teams/share-invite?token=${token}`;
        redirect(shareLink);
    }

    async function handleDeleteTeam() {
        'use server';
        await db.deleteFrom('teams').where('id', '=', team?.id ?? 0).execute();
        redirect('/hackathons/' + hackathon?.slug + '/your-team');
    }

    async function handleLeaveTeam() {
        'use server';
        await db.updateTable('teams')
            .set({ fids: sql`array_remove(fids, ${user?.id ?? 0})` })
            .where('id', '=', team?.id ?? 0)
            .execute();
        redirect('/hackathons/' + hackathon?.slug + '/your-team');
    }

    async function handleSaveTeam(name: string, description: string, walletAddress: string, embeds: any) {
        'use server';
        await db.updateTable('teams')
            .set({ name, description, wallet_address: walletAddress, embeds: sql`${JSON.stringify(embeds)}::jsonb` })
            .where('id', '=', team?.id ?? 0)
            .execute();
        redirect('/hackathons/' + hackathon?.slug + '/your-team');
    }

    async function handleSubmitTeam(name: string, description: string, walletAddress: string, embeds: any) {
        'use server';
        await db.updateTable('teams')
            .set({ name, description, wallet_address: walletAddress, embeds: sql`${JSON.stringify(embeds)}::jsonb`, submitted_at: new Date() })
            .where('id', '=', team?.id ?? 0)
            .execute();
        redirect('/hackathons/' + hackathon?.slug + '/your-team');
    }

    return (
        <div className="pt-5">
            <div className="text-white flex flex-col gap-1 items-start pl-[4.5%] pr-[4.5%]">
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
                                <InviteButton handleGenerateInvite={handleGenerateInvite} />
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