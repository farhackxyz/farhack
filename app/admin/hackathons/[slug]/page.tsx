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
        <div className="pt-5">
            <div className="text-white flex flex-col gap-1 items-start pt-5 pl-[3%]">
                <a href="/admin" className="pt-10 font-medium text-lg">
                    <p>
                        {`<- Back to Admin Panel`}
                    </p>
                </a>
                <div className="flex flex-row gap-4 items-center mt-[1.5%]">
                    <img src={hackathon.square_image} alt={`${hackathon?.name} Hackathon`} loading="lazy" className="rounded w-[4%]" />
                    <p className="text-2xl font-medium">{hackathon?.name ? `${hackathon.name} Hackathon` : 'this hackathon'}</p>
                </div>
                <div className="w-[98%] border border-1 border-white rounded-md p-5 mt-5 flex flex-col items-center">
                    <p className="font-medium"><span className="font-semibold text-lg">Create</span> or join a team to get started!</p>
                </div>
                <AddItemButton hackathonId={hackathon.id} addItem={addItem} />
                <div className="pt-10 flex flex-col gap-2 items-start">
                    <p className="text-3xl font-medium">Schedule</p>
                    <div className="text-lg">
                        <p>Dates: {startDate} - {endDate}</p>
                        {schedule ? (
                            <ul>
                                {schedule.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <a href={item.url} target="_blank" rel="noreferrer" className="underline">
                                            <p>{item.name}: {new Date(item.date).toLocaleDateString()}</p>
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
                <div className="pt-10 flex flex-col gap-2 items-start">
                    <p className="text-3xl font-medium">Tracks</p>
                    {tracks ? (
                        <ul>
                            {tracks.map((track, index) => (
                                <li key={index} className="flex justify-between">
                                    <p>{track.name}: {track.description}</p>
                                    <RemoveItemButton hackathonId={hackathon.id} modalType="Track" itemId={track.id} removeItem={removeItem} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tracks available.</p>
                    )}
                </div>
                <div className="pt-10 flex flex-col gap-2 items-start">
                    <p className="text-3xl font-medium">Bounties</p>
                    {bounties ? (
                        <ul>
                            {bounties.map((bounty, index) => (
                                <li key={index} className="flex justify-between">
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