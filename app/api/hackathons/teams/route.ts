import { db } from '@/kysely';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    try {
        let query = db.selectFrom('teams').selectAll();

        if (id) {
            query = query.where('id', '=', id as any);
        }

        const resp = await query.execute();

        if (resp.length === 0) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json(resp);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}