/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { auth } from "@/auth";
import { db } from "@/kysely";
import { sql } from 'kysely';
import { headers } from "next/headers";
import WarpcastIcon from '@/app/components/icons/warpcast-icon';

export default async function ProfileByUsernamePage() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const username = pathname ? pathname.split('/').pop() : undefined;
  if (!username) {
    return <p>Username not found in the URL</p>;
  }

  const session = await auth();

  if (session?.user && session.user.name === username) {
    const user = await db.selectFrom('users')
      .select(['id', 'name', 'image'])
      .where('name', '=', username)
      .executeTakeFirst();

    if (user) {
      session.user = {
        id: String(user.id),
        name: user.name,
        image: user.image ?? undefined,
      };

      return (
        <div className="flex flex-col gap-2 items-start mt-10 p-10">
            <div className="flex flex-row gap-2 items-center">
                <img src={session.user.image || ''} alt={`${session.user.name}&apos;s avatar`} className="w-10 h-10 rounded" />
                <p className="text-2xl font-medium pr-3">@{session.user.name}</p>
                <a href={`https://warpcast.com/${session.user.name}`} target="_blank">
                    <WarpcastIcon />
                </a>
            </div>
            <div className="mt-5 flex flex-col gap-1">
                <p className="text-lg">Profile page coming soon! <a href="/" className="text-white underline"> click here to get started!</a></p>
            </div>
        </div>
      );
    } else {
      return <p>User not found in the database</p>;
    }
  } else {
    return <p>No active session or username does not match</p>;
  }
}