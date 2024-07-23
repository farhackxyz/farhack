/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { db, acceptInvite } from '@/kysely';
import { auth } from '@/auth';

export default async function AcceptInvitePage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const hackathonSlug = pathname.split('/')[2];
    const query = headerList.get("x-current-query") as string;

    const token = query.replace('token=', '');
    const session = await auth();

    const user = await db.selectFrom('users').selectAll().where('name', '=', session?.user?.name ?? "").executeTakeFirst();

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>You are not logged in. Log in above or <a href="/" className="underline">click here to return home</a></p>
            </div>
        );
    }

    let inviteStatus = 'pending';

    try {
        if (token && session?.user) {
            await acceptInvite(token, user.id);
            inviteStatus = 'accepted';
        }
    } catch (error) {
        inviteStatus = 'failed';
    }

    return (
        <div className="flex items-center justify-center min-h-screen text-white text-2xl">
            {inviteStatus === 'accepted' ? (
                <p className="p-15">Invite accepted! <a href={`/hackathons/${hackathonSlug}/your-team`} className="underline">Click here to view team</a></p>
            ) : inviteStatus === 'failed' ? (
                <p className="p-15">Failed: Unable to process invite</p>
            ) : (
                <p className="p-15">Processing invite...</p>
            )}
        </div>
    );
}