/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTeamButton({ createTeam }: { createTeam: any }) {
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>('');
    const router = useRouter();

    const handleAddClick = (type: string) => {
        setShowModal(true);
    };

    const handleSubmit = async () => {
        await createTeam(name);
        setShowModal(false);
        setName('');
        router.refresh();
    };

    return (
        <div className="relative">
            <button
                className="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700"
                onClick={() => setShowModal(!showModal)}
            >
                Create Team
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30" onClick={() => setShowModal(false)}>
                    <div className="bg-white p-6 rounded-md w-1/3 text-black" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl mb-4 text-black">Create Team</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full mb-4 px-4 py-2 border rounded-md"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700 mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}