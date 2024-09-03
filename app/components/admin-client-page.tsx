"use client";

import React, { useState } from 'react';
import WarpcastIcon from '../components/icons/warpcast-icon';

interface UserSession {
  user: {
    name: string;
    image: string;
  };
}

interface TableRow {
  id: string;
  [key: string]: any;
}

interface AdminClientPageProps {
  session: UserSession;
  tables: {
    [key: string]: TableRow[];
  };
}

export default function AdminClientPage({ session, tables }: AdminClientPageProps) {
  const [activeTab, setActiveTab] = useState<string>('users');

  return (
    <div className="flex flex-col gap-6 items-start mt-5 px-4 p-5">
      <div className="flex flex-row gap-2 items-center p-5 pt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={session.user.image} alt={`${session.user.name}'s avatar`} className="w-10 h-10 rounded" />
        <p className="text-2xl font-medium pr-3">@{session.user.name}</p>
        <a href={`https://warpcast.com/${session.user.name}`} target="_blank" rel="noopener noreferrer">
          <WarpcastIcon />
        </a>
      </div>
      <div className="w-full p-4">
        <div className="flex mb-4 space-x-4">
          {Object.keys(tables).map((table) => (
            <button
              key={table}
              className={`text-xl font-semibold ${activeTab === table ? 'text-blue-500' : 'text-white'}`}
              onClick={() => setActiveTab(table)}
            >
              {table.charAt(0).toUpperCase() + table.slice(1)}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full bg-gray-800 rounded-xl">
            <thead>
              <tr className="bg-gray-700 text-white">
                {Object.keys(tables[activeTab][0] || {}).map((col) => (
                  <th key={col} className="py-2 px-4">{col}</th>
                ))}
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables[activeTab].map((row: TableRow) => (
                <tr key={row.id} className="bg-gray-900 text-white hover:bg-gray-700">
                  {Object.keys(row).map((col) => (
                    <td key={col} className="border px-4 py-2">{row[col]}</td>
                  ))}
                  <td className="border px-4 py-2 flex justify-center">
                    <a href={`/admin/${activeTab}/${row.id}`} className="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700">
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
