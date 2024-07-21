/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';
import HackathonBounites from '@/app/components/hackathon-bounties';

export default async function HackathonBounitesPage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const pathnameParts = pathname.split('/');
    const slug = pathnameParts[2];

    if (!slug) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>No slug found. <a href="/" className="underline">Return to home</a></p>
            </div>
        );
    }

    return <HackathonBounites slug={slug} />;
}