/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import HackathonTeams from '@/app/components/hackathon-teams';

export default async function HackathonTeamsPage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const pathnameParts = pathname.split('/');
    const slug = pathnameParts[2];

    if (!slug || slug.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>Invalid hackathon slug. <a href="/" className="underline">Return to home</a></p>
            </div>
        );
    }

    return <HackathonTeams slug={slug} />;
}