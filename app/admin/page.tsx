/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { auth } from "../../auth";
import { db } from "../../kysely";
import { headers } from "next/headers";
import WarpcastIcon from '../components/icons/warpcast-icon';

export default async function AdminPanel() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const username = pathname ? pathname.split('/').pop() : undefined;

  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>Access denied. <a href="/" className="underline">Please return home</a></p>
      </div>
    );
  }

  const user = await db.selectFrom('users')
    .select(['id', 'name', 'image', 'is_admin'])
    .where('name', '=', session.user.name ?? '')
    .executeTakeFirst();

  if (!user || !user.is_admin) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-2xl">
        <p>Access denied. <a href="/" className="underline">Please return home</a>.</p>
      </div>
    );
  }

  const hackathons = await db.selectFrom('hackathons')
    .selectAll()
    .execute();

  return (
    <div className="flex flex-col gap-6 items-start mt-5 px-4 p-5">
      <div className="flex flex-row gap-2 items-center p-5 pt-10">
        <img src={session.user.image || ''} alt={`${session.user.name}&apos;s avatar`} className="w-10 h-10 rounded" />
        <p className="text-2xl font-medium pr-3">@{session.user.name}</p>
        <a href={`https://warpcast.com/${session.user.name}`} target="_blank">
          <WarpcastIcon />
        </a>
      </div>
      <div className="w-full p-4">
        <p className="text-2xl font-semibold mb-4">Hackathons</p>
        {hackathons.length > 0 ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full bg-gray-800 rounded-xl">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Start Date</th>
                  <th className="py-2 px-4">End Date</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {hackathons.map(hackathon => (
                  <tr key={hackathon.id} className="bg-gray-900 text-white hover:bg-gray-700">
                    <td className="border px-4 py-2">{hackathon.name}</td>
                    <td className="border px-4 py-2">{hackathon.description}</td>
                    <td className="border px-4 py-2">{new Date(hackathon.start_date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{new Date(hackathon.end_date).toLocaleDateString()}</td>
                    <td className="border px-4 py-2 flex justify-center">
                      <a href={`/admin/hackathons/${hackathon.slug}`} className="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700">
                        Manage
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg">None yet :/ <a href="/" className="text-blue-500 underline">click here to get started!</a></p>
        )}
      </div>
    </div>
  );
}