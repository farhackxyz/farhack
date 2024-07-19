"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function RemoveItemButton({ hackathonId, modalType, itemId, removeItem }: { hackathonId: number, modalType: string, itemId: number, removeItem: any }) {
    const router = useRouter();

    const handleRemove = async () => {
        await removeItem(hackathonId, modalType, itemId);
        router.refresh();
    };

    return (
        <button onClick={handleRemove} className="text-red-500">
            x
        </button>
    );
}