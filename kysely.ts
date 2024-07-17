import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { Generated, ColumnType } from 'kysely';

interface UserTable {
  id: Generated<number>;
  created_at: Generated<Date>;
  name: string;
  image: string;
}

export interface Database {
  users: UserTable;
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