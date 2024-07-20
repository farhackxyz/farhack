'use client';

import React from 'react';

export default function InviteButton({ handleGenerateInvite }: { handleGenerateInvite: () => Promise<string> }) {

    const handleClick = async () => {
        await handleGenerateInvite();
    };

    return (
        <button
            onClick={handleClick}
            className="bg-gray-600 text-white p-2 rounded-full"
        >
            Create Invite Link
        </button>
    );
}