"use server";

import { db, sql } from "@/kysely";
import { redirect } from "next/navigation";
import { BASE_URL } from "../utils";
import { createInvite } from "./invites";

export async function createTeam(name: string, description: string = '', hackathon_id: number, user_id: number) {
    'use server';
    const emptyJsonArray = JSON.stringify([]);
    await db.insertInto('teams').values({
        name: name,
        description: description,
        hackathon_id: hackathon_id,
        fids: [user_id],
        wallet_address: '',
        embeds: sql`${emptyJsonArray}::jsonb`
    }).execute();
}

export async function handleGenerateInvite(user_id: number, team_id: number, hackathon_slug: string): Promise<string> {
    'use server';
    const token = await createInvite(user_id, team_id);
    const shareLink = `${BASE_URL}/hackathons/${hackathon_slug}/teams/share-invite?token=${token}`;
    redirect(shareLink);
}

export async function handleDeleteTeam(team_id: number, hackathon_slug: string) {
    'use server';
    await db.deleteFrom('teams').where('id', '=', team_id).execute();
    redirect('/hackathons/' + hackathon_slug + '/your-team');
}

export async function handleLeaveTeam(user_id: number, team_id: number, hackathon_slug: string) {
    'use server';
    await db.updateTable('teams')
        .set({ fids: sql`array_remove(fids, ${user_id})` })
        .where('id', '=', team_id)
        .execute();
    redirect('/hackathons/' + hackathon_slug + '/your-team');
}

export async function handleSaveTeam(name: string, description: string, walletAddress: string, embeds: any, team_id: number, hackathon_slug: string) {
    'use server';
    await db.updateTable('teams')
        .set({ name, description, wallet_address: walletAddress, embeds: sql`${JSON.stringify(embeds)}::jsonb` })
        .where('id', '=', team_id)
        .execute();
    redirect('/hackathons/' + hackathon_slug + '/your-team');
}

export async function handleSubmitTeam(name: string, description: string, walletAddress: string, embeds: any, team_id: number, hackathon_slug: string) {
    'use server';
    await db.updateTable('teams')
        .set({ name, description, wallet_address: walletAddress, embeds: sql`${JSON.stringify(embeds)}::jsonb`, submitted_at: new Date() })
        .where('id', '=', team_id)
        .execute();
    redirect('/hackathons/' + hackathon_slug + '/your-team');
}