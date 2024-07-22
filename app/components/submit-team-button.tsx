/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitTeamButton({ team, hackathonEndDate, handleSaveTeam, handleSubmitTeam }: { team: any, hackathonEndDate: string, handleSaveTeam: any, handleSubmitTeam: any }) {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const isBeforeEndDate = new Date() < new Date(hackathonEndDate);

    const handleSubmit = async () => {
        await handleSubmitTeam(team.name, team.description, team.walletAddress, team.embeds);
        setShowModal(false);
    };

    return (
        <>
            <button
                className={`bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-700 mt-2 ${!isBeforeEndDate && 'cursor-not-allowed opacity-50'}`}
                onClick={() => isBeforeEndDate && setShowModal(true)}
                disabled={!isBeforeEndDate}
            >
                Submit Team
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30" onClick={() => setShowModal(false)}>
                    <div className="bg-white p-6 rounded-md w-1/3 text-black" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl mb-4 text-black">Are you sure? Submitting your team is an irreversible action</h2>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700 mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700"
                                onClick={handleSubmit}
                            >
                                {`Yes I'm sure`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}