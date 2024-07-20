/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import { db, acceptInvite } from '@/kysely';
import { auth } from '@/auth';

export default async function AcceptInvitePage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const urlParams = new URLSearchParams(pathname.split('?')[1]);
    const token = urlParams.get('token');
    const session = await auth();

    const processInvite = async () => {
        try {
            if (token && session?.user) {
                await acceptInvite(token, parseInt(session.user.id ?? ""));
                alert('Invite accepted! Redirecting to your team page...');
                window.location.replace('/your-team');
            }
        } catch (error) {
            alert('Failed to accept invite: ' + (error as unknown as Error).message);
        }
    };

    processInvite();

    return <p>Processing invite...</p>;
}