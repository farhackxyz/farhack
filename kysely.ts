import { Kysely, PostgresDialect, sql, Generated, ColumnType } from 'kysely';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export type Json = JsonValue;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Numeric = ColumnType<string, number | string, number | string>;

export interface UserTable {
  id: Generated<number>;
  created_at: Generated<Date>;
  name: string;
  image: string;
  is_admin: boolean;
}

export interface TeamsTable {
  id: Generated<number>;
  fids: number[];
  name: string;
  description: string;
  hackathon_id: number;
  submitted_at?: Date;
  wallet_address: string;
  embeds: Json;
}

export interface HackathonsTable {
  id: Generated<number>;
  name: string;
  description: string;
  slug: string;
  square_image: string;
  start_date: Date;
  end_date: Date;
  created_at: Generated<Date>;
  tracks: Json;
  bounties: Json;
  schedule: Json;
}

export interface InvitesTable {
  id: Generated<number>;
  token: string;
  created_at: Generated<Date>;
  expires_at: Date;
  user_id: number;
  accepted_at?: Date;
  accepted_by?: number;
  team_id?: number;
}

export interface Database {
  users: UserTable;
  teams: TeamsTable;
  hackathons: HackathonsTable;
  invites: InvitesTable;
}

const connectionString = process.env.DATABASE_URL ?? "";

const pool = new Pool({
  connectionString,
});

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool,
  }),
});

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

export { sql } from 'kysely';