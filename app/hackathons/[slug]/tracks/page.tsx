/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { db } from '@/kysely';
import { headers } from 'next/headers';
import HackathonNav from '@/app/components/hackathon-nav';
import { Track } from '@/app/lib/types';
import HackathonTracks from '@/app/components/hackathon-tracks';

export default async function HackathonTracksPage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const pathnameParts = pathname.split('/');
    const slug = pathnameParts[2];

    if (!slug) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-2xl">
                <p>No data found. <a href="/" className="underline">Return to home</a></p>
            </div>
        );
    }

    return <HackathonTracks slug={slug} />;
}