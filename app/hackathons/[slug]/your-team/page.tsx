/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { db, sql, createInvite } from '@/kysely';
import { auth } from '@/auth';
import HackathonNav from '@/app/components/hackathon-nav';
import InviteButton from '@/app/components/invite-button';
import CreateTeamButton from '@/app/components/create-team-button';
import { redirect } from 'next/navigation';

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

    async function createTeam(name: string, description: string) {
        'use server';
        const newTeam = await db.insertInto('teams').values({
            name: name,
            description: description,
            hackathon_id: hackathon?.id ?? 0,
            fids: [user?.id ?? 0]
        } as unknown as any).execute();
        return;
    }

    async function handleGenerateInvite(): Promise<string> {
        'use server';
        const token = await createInvite(user?.id ?? 0);
        const base = 'http://localhost:3000';
        const shareLink = `${base}/hackathons/${hackathon?.slug}/teams/share-invite?token=${token}`;
        redirect(shareLink);
    }

    return (
        <div className="pt-5">
            <div className="text-white flex flex-col gap-1 items-start pl-[4.5%]">
                <HackathonNav hackathon={hackathon} />
                {team ? (
                    <>
                        <p className="text-2xl font-semibold mt-5 mb-3">Your Team</p>
                        <div className="p-4 rounded-md bg-gray-600 text-white transition-colors duration-200 mb-3">
                            <p className="font-semibold">{team.name}</p>
                            <p className="text-sm">{team.description}</p>
                        </div>
                        <InviteButton handleGenerateInvite={handleGenerateInvite} />
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