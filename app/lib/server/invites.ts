"use server";

import { db, sql } from "@/kysely";
import { v4 as uuidv4 } from 'uuid';

export const createInvite = async (userId: number, teamId: number): Promise<string> => {
    if (!userId || !teamId) {
      throw new Error('User ID and Team ID are required');
    }
  
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  
    await db.insertInto('invites').values({
      token,
      expires_at: expiresAt,
      user_id: userId,
      team_id: teamId
    }).execute();
  
    return token;
  };
  
  export const acceptInvite = async (token: string, userId: number): Promise<void> => {
    if (!token || !userId) {
      throw new Error('Token and user ID are required');
    }
  
    const invite = await db.selectFrom('invites')
      .selectAll()
      .where('token', '=', token)
      .where('expires_at', '>', new Date())
      .where('accepted_at', 'is', null)
      .executeTakeFirst();
  
    if (!invite) {
      throw new Error('Invalid or expired invite');
    }
  
    if (invite.team_id === undefined) {
      throw new Error('Invite does not have a valid team_id');
    }
  
    await db.transaction().execute(async (trx) => {
      await trx.updateTable('invites')
        .set({ accepted_at: new Date(), accepted_by: userId })
        .where('id', '=', invite.id)
        .execute();
  
      await trx.updateTable('teams')
        .set({
          fids: sql`array_append(fids, ${userId})`
        })
        .where('id', '=', (invite.team_id as unknown as number))
        .execute();
    });
  };