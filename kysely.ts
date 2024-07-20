import { Kysely, PostgresDialect, sql, Generated, ColumnType  } from 'kysely';
import { Pool } from 'pg';

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
  submitted_at: Date;
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
  // TODO: find a better way to represent JSONB columns in kysely
  tracks: Json;
  bounties: Json;
  schedule: Json;
}

export interface Database {
  users: UserTable;
  teams: TeamsTable;
  hackathons: HackathonsTable;
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

export { sql } from 'kysely';
