/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';

export default function DeleteOrLeaveTeamButton({
    teamId,
    userId,
    teamMembers,
    handleDeleteTeam,
    handleLeaveTeam
}: {
    teamId: number,
    userId: number,
    teamMembers: any[],
    handleDeleteTeam: () => void,
    handleLeaveTeam: () => void
}) {
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState<"delete" | "leave" | null>(null);

    const handleAction = () => {
        if (action === "delete") {
            handleDeleteTeam();
        } else if (action === "leave") {
            handleLeaveTeam();
        }
        setShowModal(false);
    };

    return (
        <>
            {teamMembers.length === 1 && teamMembers[0].id === userId && (
                <button
                    className="bg-red-600 text-white rounded-full px-4 py-2 hover:bg-red-700 mt-3"
                    onClick={() => {
                        setAction("delete");
                        setShowModal(true);
                    }}
                >
                    Delete Team
                </button>
            )}
            {teamMembers.length > 1 && (
                <button
                    className="bg-yellow-600 text-white rounded-full px-4 py-2 hover:bg-yellow-700 mt-3"
                    onClick={() => {
                        setAction("leave");
                        setShowModal(true);
                    }}
                >
                    Leave Team
                </button>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30" onClick={() => setShowModal(false)}>
                    <div className="bg-white p-6 rounded-md w-1/3 text-black" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl mb-4 text-black">
                            {action === "delete" ? "Are you sure you want to delete this team?" : "Are you sure you want to leave this team?"}
                        </h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700 mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-600 text-white rounded-full px-4 py-2 hover:bg-red-700"
                                onClick={handleAction}
                            >
                                {action === "delete" ? "Delete" : "Leave"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}