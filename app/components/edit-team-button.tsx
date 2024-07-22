/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTeamButton({ team, hackathonEndDate, handleSaveTeam, handleSubmitTeam }: { team: any, hackathonEndDate: string, handleSaveTeam: any, handleSubmitTeam: any }) {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(team.name);
    const [description, setDescription] = useState(team.description);
    const [walletAddress, setWalletAddress] = useState(team.wallet_address || '');
    const [embeds, setEmbeds] = useState(team.embeds || []);
    const router = useRouter();

    const isBeforeEndDate = new Date() < new Date(hackathonEndDate);

    const handleSave = async () => {
        await handleSaveTeam(name, description, walletAddress, embeds);
        setShowModal(false);
    };

    const handleAddEmbed = () => {
        setEmbeds([...embeds, { type: '', url: '' }]);
    };

    const handleEmbedChange = (index: number, field: string, value: string) => {
        const updatedEmbeds = embeds.map((embed: any, i: number) => i === index ? { ...embed, [field]: value } : embed);
        setEmbeds(updatedEmbeds);
    };

    const handleEmbedRemove = (index: number) => {
        const updatedEmbeds = embeds.filter((_: any, i: number) => i !== index);
        setEmbeds(updatedEmbeds);
    };

    return (
        <>
            <button
                className={`bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700 mt-2 ${!isBeforeEndDate && 'cursor-not-allowed opacity-50'}`}
                onClick={() => isBeforeEndDate && setShowModal(true)}
                disabled={!isBeforeEndDate}
            >
                Edit
            </button>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30" onClick={() => setShowModal(false)}>
                    <div className="bg-white p-6 rounded-md w-1/3 text-black" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl mb-4 text-black">Edit Team</h2>
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
                        <input
                            type="text"
                            placeholder="Wallet Address"
                            className="w-full mb-4 px-4 py-2 border rounded-md"
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                        />
                        <div className="mb-4">
                            <p className="font-semibold mb-2">Embeds:</p>
                            {embeds.map((embed: any, index: number) => (
                                <div key={index} className="mb-2">
                                    <select
                                        className="w-full mb-1 px-4 py-2 border rounded-md"
                                        value={embed.type}
                                        onChange={(e) => handleEmbedChange(index, 'type', e.target.value)}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="image">Image</option>
                                        <option value="url">URL</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="URL"
                                        className="w-full px-4 py-2 border rounded-md"
                                        value={embed.url}
                                        onChange={(e) => handleEmbedChange(index, 'url', e.target.value)}
                                    />
                                    <button
                                        className="bg-red-600 text-white rounded-full px-2 py-1 hover:bg-red-700 mt-2"
                                        onClick={() => handleEmbedRemove(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                className="bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 mt-2"
                                onClick={handleAddEmbed}
                            >
                                Add Embed
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-600 text-white rounded-full px-4 py-2 hover:bg-gray-700 mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 mr-2"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}