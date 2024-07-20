'use client';

import React from 'react';

export default function InviteButton({ handleGenerateInvite }: { handleGenerateInvite: () => Promise<string> }) {
    const handleClick = async () => {
        const inviteLink = await handleGenerateInvite();
        alert(`Invite link: ${inviteLink}`);
    };

    return (
        <button
            onClick={handleClick}
            className="bg-blue-600 text-white p-2 rounded-md"
        >
            Generate Invite Link
        </button>
    );
}