import { NextRequest, NextResponse } from "next/server";
import { db } from '../../../kysely';

export async function GET(request: NextRequest) {
    try {
        const result = await db.selectFrom('users').select(db.fn.count('id').as('count')).execute();
        const count = result[0]?.count ?? 0;
        return NextResponse.json({ count });
      } catch (error) {
        // set status?
        return NextResponse.json({ error: 'Failed to fetch user count' });
      }
}