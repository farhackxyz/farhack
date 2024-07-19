import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Generated, ColumnType } from 'kysely';

export interface UserTable {
  id: Generated<number>;
  created_at: Generated<Date>;
  name: string;
  image: string;
  is_admin: boolean;
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
  tracks: ColumnType<unknown, string, unknown>; 
  bounties: ColumnType<unknown, string, unknown>; 
  schedule: ColumnType<unknown, string, unknown>;
}

export interface Database {
  users: UserTable;
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

export { sql } from 'kysely';
