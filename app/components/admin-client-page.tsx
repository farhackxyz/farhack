/* eslint-disable @next/next/no-img-element */
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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);

  const handleEditClick = (row: TableRow) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (window.confirm('Are you sure you want to close without saving?')) {
      setIsModalOpen(false);
      setSelectedRow(null);
    }
  };

  const handleSave = () => {
    if (window.confirm('Are you sure you want to save changes?')) {
      // Logic to save changes goes here
      setIsModalOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (selectedRow) {
      setSelectedRow({
        ...selectedRow,
        [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 items-start mt-5 px-4 p-5">
      <div className="flex flex-row gap-2 items-center p-5 pt-10">
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
                    <td key={col} className="border px-4 py-2">{String(row[col])}</td>
                  ))}
                  <td className="border px-4 py-2 flex justify-center">
                    <button
                      onClick={() => handleEditClick(row)}
                      className="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && selectedRow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-0">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Edit {activeTab.slice(0, -1)}</h2>
            {Object.keys(selectedRow).map((key) => (
              <div key={key} className="mb-2">
                <label className="block text-sm font-medium">{key}</label>
                {typeof selectedRow[key] === 'boolean' ? (
                  <input
                    type="checkbox"
                    checked={selectedRow[key]}
                    onChange={(e) => handleInputChange(e, key)}
                    className="mt-1"
                  />
                ) : (
                  <input
                    type="text"
                    value={selectedRow[key]}
                    onChange={(e) => handleInputChange(e, key)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-700 text-white"
                  />
                )}
              </div>
            ))}
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-red-600 text-white rounded-full px-4 py-2 hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}