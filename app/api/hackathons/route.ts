import { db } from '@/kysely';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
        return NextResponse.json({ error: "slug parameter is required" }, { status: 400 });
    }

    try {
        const resp = await db
            .selectFrom('hackathons')
            .selectAll()
            .where('slug', '=', slug as any)
            .executeTakeFirst();

        if (!resp) {
            return NextResponse.json({ error: "Record not found" }, { status: 404 });
        }

        return NextResponse.json(resp);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}