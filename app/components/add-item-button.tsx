/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function AddItemButton({ hackathonId, addItem }: { hackathonId: number, addItem: any }) {
    const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [modalType, setModalType] = React.useState<string | null>(null);
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [date, setDate] = React.useState<string>('');
    const [url, setUrl] = React.useState<string>('');
    const router = useRouter();

    const handleAddClick = (type: string) => {
        setModalType(type);
        setShowModal(true);
        setShowDropdown(false);
    };

    const handleSubmit = async () => {
        await addItem(hackathonId, modalType, name, description, date, url);
        setShowModal(false);
        setName('');
        setDescription('');
        setDate('');
        setUrl('');
        router.refresh();
    };

    return (
        <div className="relative">
            <button
                className="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                Add
            </button>
            {showDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => handleAddClick('ScheduleItem')}
                    >
                        Schedule Item
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => handleAddClick('Bounty')}
                    >
                        Bounty
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => handleAddClick('Track')}
                    >
                        Track
                    </button>
                </div>
            )}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30" onClick={() => setShowModal(false)}>
                    <div className="bg-white p-6 rounded-md w-1/3 text-black" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl mb-4 text-black">{modalType}</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full mb-4 px-4 py-2 border rounded-md"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <textarea
                            placeholder="Description"
                            className="w-full mb-4 px-4 py-2 border rounded-md"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {modalType === 'ScheduleItem' && (
                            <>
                                <input
                                    type="date"
                                    className="w-full mb-4 px-4 py-2 border rounded-md text-black"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    className="w-full mb-4 px-4 py-2 border rounded-md"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </>
                        )}
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