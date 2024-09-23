"use server"

import { db, sql } from "@/kysely";

export const addItem = async (
    hackathonId: number,
    modalType: string,
    name: string,
    description: string,
    date?: string
  ) => {
    const newItem = modalType === 'ScheduleItem'
      ? { name, description, date: new Date(date!).toISOString() }
      : { name, description };
  
    if (modalType === 'ScheduleItem' && date) {
      await db
        .updateTable('hackathons')
        .set({
          schedule: sql`jsonb_set(coalesce(schedule, '[]'::jsonb), '{${new Date().getTime()}}', ${JSON.stringify(newItem)}::jsonb)`
        })
        .where('id', '=', hackathonId)
        .execute();
    } else if (modalType === 'Bounty') {
      await db
        .updateTable('hackathons')
        .set({
          bounties: sql`jsonb_set(coalesce(bounties, '[]'::jsonb), '{${new Date().getTime()}}', ${JSON.stringify(newItem)}::jsonb)`
        })
        .where('id', '=', hackathonId)
        .execute();
    } else if (modalType === 'Track') {
      await db
        .updateTable('hackathons')
        .set({
          tracks: sql`jsonb_set(coalesce(tracks, '[]'::jsonb), '{${new Date().getTime()}}', ${JSON.stringify(newItem)}::jsonb)`
        })
        .where('id', '=', hackathonId)
        .execute();
    }
};