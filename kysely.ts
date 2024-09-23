import { Kysely, PostgresDialect, sql, Generated, ColumnType } from 'kysely';
import { Pool } from 'pg';

export type Json = JsonValue;
export type JsonArray = JsonValue[];
export type JsonPrimitive = boolean | number | string | null;
export type JsonValue = JsonArray | JsonObject | JsonPrimitive;
export type Numeric = ColumnType<string, number | string, number | string>;

export type JsonObject = {
  [K in string]?: JsonValue;
};

export interface UserTable {
  id: Generated<number>;
  created_at: Generated<Date>;
  name: string;
  image: string;
  is_admin: boolean;
  admin_hackathons: string;
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

export interface TicketsTable {
  id: Generated<number>;
  user_id: number;
  user_address: string;
  hackathon_id: number;
  txn_hash: string;
  ticket_type: string;
  amount: number;
  created_at: Generated<Date>;
}

export interface Database {
  users: UserTable;
  teams: TeamsTable;
  hackathons: HackathonsTable;
  invites: InvitesTable;
  tickets: TicketsTable;
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