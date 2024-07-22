'use client';

import React from 'react';

export default function InviteButton({ handleGenerateInvite }: { handleGenerateInvite: () => Promise<string> }) {

    const handleClick = async () => {
        await handleGenerateInvite();
    };

    return (
        <button
            onClick={handleClick}
            className="bg-gray-600 hover:bg-gray-700 text-white text-md rounded-full px-4 py-2 mt-2"
        >
            Create Invite Link
        </button>
    );
}