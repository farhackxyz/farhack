/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { db, sql } from '@/kysely';
import { auth } from '@/auth';
import CopyClipboardIcon from '@/app/components/copy-to-clipboard';

export default async function ShareInvitePage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const query = headerList.get("x-current-query") as string;

    const token = query.replace('token=', '');
    const session = await auth();
    const basePath = 'http://localhost:3000';
    const hackathonSlug = pathname.split('/')[2];

    const user = await db.selectFrom('users').selectAll().where('name', '=', session?.user?.name ?? "").executeTakeFirst();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>You are not logged in. Log in above or <a href="/" className="underline">click here to return home</a></p>
            </div>
        );
    }

    const team = await db.selectFrom('teams')
        .selectAll()
        .where(sql<boolean>`fids @> ARRAY[${user.id}]::int[]`)
        .executeTakeFirst();

    if (!team) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>You are not part of any team.</p>
            </div>
        );
    }

    const acceptLink = `${basePath}/hackathons/${hackathonSlug}/teams/accept-invite?token=${token}`;

    return (
        <div className="flex flex-col gap-1 items-center justify-center min-h-screen text-white text-2xl">
            <a href={`/hackathons/${hackathonSlug}/your-team`} className="underline pb-4">Back to Your Team</a>
            <div className="flex flex-row gap-2 items-center">
                <p>Created share link! Click to copy link</p>
                <CopyClipboardIcon value={acceptLink} />
            </div>
            <p className="text-sm">Note: this is a one-time use link</p>
        </div>
    );
}