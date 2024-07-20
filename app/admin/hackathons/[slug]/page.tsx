/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { db } from '@/kysely';
import { headers } from 'next/headers';
import { type Track, type ScheduleItem, type Bounty } from '@/app/lib/types';
import AddItemButton from '@/app/components/add-item-button';
import RemoveItemButton from '@/app/components/remove-item-button';

export default async function HackathonBySlugPage() {
    async function addItem(
        hackathonId: number,
        modalType: string,
        name: string,
        description: string,
        date?: string,
        url?: string
    ) {
        'use server';

        const newItem = modalType === 'ScheduleItem'
            ? { id: Date.now(), name, description, date: date ? new Date(date).toISOString() : undefined, url }
            : { id: Date.now(), name, description };

        const hackathon = await db
            .selectFrom('hackathons')
            .selectAll()
            .where('id', '=', hackathonId)
            .executeTakeFirst();

        if (!hackathon) {
            throw new Error('Hackathon not found');
        }

        if (modalType === 'ScheduleItem' && date) {
            const updatedSchedule = hackathon.schedule ? [...(hackathon.schedule as unknown as any[]), newItem] : [newItem];
            await db
                .updateTable('hackathons')
                .set({ schedule: JSON.stringify(updatedSchedule) })
                .where('id', '=', hackathonId)
                .executeTakeFirst();
        } else if (modalType === 'Bounty') {
            const updatedBounties = hackathon.bounties ? [...(hackathon.bounties as unknown as any[]), newItem] : [newItem];
            await db
                .updateTable('hackathons')
                .set({ bounties: JSON.stringify(updatedBounties) })
                .where('id', '=', hackathonId)
                .executeTakeFirst();
        } else if (modalType === 'Track') {
            const updatedTracks = hackathon.tracks ? [...(hackathon.tracks as unknown as any[]), newItem] : [newItem];
            await db
                .updateTable('hackathons')
                .set({ tracks: JSON.stringify(updatedTracks) })
                .where('id', '=', hackathonId)
                .executeTakeFirst();
        }
    }

    async function removeItem(hackathonId: number, modalType: string, itemId: number) {
        'use server';

        const hackathon = await db
            .selectFrom('hackathons')
            .selectAll()
            .where('id', '=', hackathonId)
            .executeTakeFirst();

        if (!hackathon) {
            throw new Error('Hackathon not found');
        }

        if (modalType === 'ScheduleItem') {
            const updatedSchedule = hackathon.schedule ? (hackathon.schedule as unknown as any[]).filter((item: ScheduleItem) => item.id !== itemId) : [];
            await db
                .updateTable('hackathons')
                .set({ schedule: JSON.stringify(updatedSchedule) })
                .where('id', '=', hackathonId)
                .executeTakeFirst();
        } else if (modalType === 'Bounty') {
            const updatedBounties = hackathon.bounties ? (hackathon.bounties as unknown as any[]).filter((item: Bounty) => item.id !== itemId) : [];
            await db
                .updateTable('hackathons')
                .set({ bounties: JSON.stringify(updatedBounties) })
                .where('id', '=', hackathonId)
                .executeTakeFirst();
        } else if (modalType === 'Track') {
            const updatedTracks = hackathon.tracks ? (hackathon.tracks as unknown as any[]).filter((item: Track) => item.id !== itemId) : [];
            await db
                .updateTable('hackathons')
                .set({ tracks: JSON.stringify(updatedTracks) })
                .where('id', '=', hackathonId)
                .executeTakeFirst();
        }
    }

    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const pathnameParts = pathname.split('/');
    const slug = pathnameParts[3];

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

    const startDate = new Date(hackathon.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const endDate = new Date(hackathon.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

    const tracks = hackathon.tracks as unknown as Track[];
    const schedule = hackathon.schedule as unknown as ScheduleItem[];
    const bounties = hackathon.bounties as unknown as Bounty[];

    return (
        <div className="pt-5 px-4">
            <div className="text-white flex flex-col gap-1 items-start pt-5 p-4">
                <a href="/admin" className="pt-10 font-medium text-lg">
                    <p>
                        {`<- Back to Admin Panel`}
                    </p>
                </a>
                <div className="flex flex-row gap-4 items-center mt-[1.5%] mb-[2%]">
                    <img src={hackathon.square_image} alt={`${hackathon?.name} Hackathon`} loading="lazy" className="rounded w-[4%]" />
                    <p className="text-2xl font-medium">{hackathon?.name ? `${hackathon.name} Hackathon` : 'this hackathon'}</p>
                </div>
                <AddItemButton hackathonId={hackathon.id} addItem={addItem} />
                <div className="pt-10 flex flex-col gap-2 items-start w-full">
                    <p className="text-3xl font-medium">Schedule</p>
                    <div className="text-lg w-full">
                        <p>Dates: {startDate} - {endDate}</p>
                        {schedule ? (
                            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {schedule.map((item, index) => (
                                    <li key={index} className="flex justify-between p-4 bg-gray-800 rounded-md">
                                        <a href={item.url} target="_blank" rel="noreferrer" className="underline">
                                            <p>{item.name}: {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                        </a>
                                        <RemoveItemButton hackathonId={hackathon.id} modalType="ScheduleItem" itemId={item.id} removeItem={removeItem} />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No schedule available</p>
                        )}
                    </div>
                </div>
                <div className="pt-10 flex flex-col gap-2 items-start w-full">
                    <p className="text-3xl font-medium">Tracks</p>
                    {tracks ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {tracks.map((track, index) => (
                                <li key={index} className="flex justify-between p-4 bg-gray-800 rounded-md">
                                    <p>{track.name}: {track.description}</p>
                                    <RemoveItemButton hackathonId={hackathon.id} modalType="Track" itemId={track.id} removeItem={removeItem} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tracks available.</p>
                    )}
                </div>
                <div className="pt-10 flex flex-col gap-2 items-start w-full">
                    <p className="text-3xl font-medium">Bounties</p>
                    {bounties ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {bounties.map((bounty, index) => (
                                <li key={index} className="flex justify-between p-4 bg-gray-800 rounded-md">
                                    <p>{bounty.name}: {bounty.description}</p>
                                    <RemoveItemButton hackathonId={hackathon.id} modalType="Bounty" itemId={bounty.id} removeItem={removeItem} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No bounties available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}