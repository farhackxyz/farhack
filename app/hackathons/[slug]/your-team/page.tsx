/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { db, sql, createInvite } from '@/kysely';
import { auth } from '@/auth';
import HackathonNav from '@/app/components/hackathon-nav';
import InviteButton from '@/app/components/invite-button';
import CreateTeamButton from '@/app/components/create-team-button';
import DeleteOrLeaveTeamButton from '@/app/components/delete-or-leave-team-button';
import EditOrSubmitTeamButton from '@/app/components/edit-or-submit-team-button';
import { redirect } from 'next/navigation';
import { BASE_URL } from '@/app/lib/utils';

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
        .executeTakeFirst();

    let teamMembers: any = [];
    if (team) {
        teamMembers = await db.selectFrom('users')
            .selectAll()
            .where('id', 'in', team.fids)
            .execute();
    }

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
            <div className="text-white flex flex-col gap-1 items-start pl-[4.5%]">
                <HackathonNav hackathon={hackathon} />
                <p className="text-2xl font-semibold mt-5 mb-3">Your Team</p>
                {team ? (
                    <>
                        <div className="p-4 rounded-md bg-gray-600 text-white transition-colors duration-200 mb-3">
                            <p className="font-semibold">{team.name}</p>
                            <p className="text-sm">{team.description}</p>
                        </div>
                        <div className="mb-3">
                            <p className="text-xl font-semibold mb-2">Team Members:</p>
                            <ul className="list-disc pl-5">
                                {teamMembers.map((member: any) => (
                                    <li key={member.id} className="text-sm">{member.name}</li>
                                ))}
                            </ul>
                        </div>
                        {!team.submitted_at && (
                            <InviteButton handleGenerateInvite={handleGenerateInvite} />
                        )}
                        {!team.submitted_at && (
                            <DeleteOrLeaveTeamButton 
                                teamId={team.id} 
                                userId={user.id} 
                                teamMembers={teamMembers} 
                                handleDeleteTeam={handleDeleteTeam} 
                                handleLeaveTeam={handleLeaveTeam} 
                            />
                        )}
                        {team.submitted_at ? (
                            <p className="text-sm mt-3">Submitted at: {new Date(team.submitted_at).toLocaleString()}</p>
                        ) : (
                            <EditOrSubmitTeamButton 
                                team={team} 
                                hackathonEndDate={hackathon.end_date.toISOString()}
                                handleSaveTeam={handleSaveTeam}
                                handleSubmitTeam={handleSubmitTeam}
                            />
                        )}
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