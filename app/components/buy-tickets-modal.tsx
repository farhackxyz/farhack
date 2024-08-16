"use client";
import { ArrowUturnLeftIcon, TicketIcon } from "@heroicons/react/20/solid";
import React from "react";
import BuyTicketTransaction from "./buy-ticket-transaction";

export default function BuyTicketsModal({ user, hasTicket, ticketsLeft }: { user: any, hasTicket: boolean, ticketsLeft: number }) {
    const [showModal, setShowModal] = React.useState<boolean>(false);

    const handleOnClick = () => {
        if (user && !hasTicket && !showModal) {
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div
                className={`max-w-[75%] flex flex-row gap-2 items-center justify-center text-center px-3 py-2.5 rounded-xl bg-[#58499B] mt-4 ${(user && !hasTicket && ticketsLeft > 0) ? 'cursor-pointer' : ''}`}
                onClick={() => handleOnClick()}
            >
                <TicketIcon className="w-5" />
                {hasTicket ? (
                    <p>You already have a ticket :D</p>
                ) : user ? (
                    ticketsLeft > 0 ? (
                        <p>Buy Tickets ({ticketsLeft} left)</p>
                    ) : (
                        <p>Sold Out</p>
                    )
                ) : (
                    <p>Sign In to Buy Tickets</p>
                )}
            </div>

            {showModal && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleCloseModal}></div>
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-[#58499B] p-6 rounded-lg shadow-lg max-w-md w-full">
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    className="text-white"
                                    onClick={handleCloseModal}
                                >
                                    <ArrowUturnLeftIcon className="w-5 h-5" />
                                </button>
                                <p className="text-white text-center absolute left-1/2 transform -translate-x-1/2">
                                    Checkout
                                </p>
                                <div className="flex items-center bg-white text-[#58499B] border-1 rounded-full px-2 py-1 cursor-pointer" style={{ maxWidth: '140px' }}>
                                    <img
                                        src={user?.image ?? ""}
                                        alt="User Image"
                                        className="w-6 h-6 rounded-full"
                                    />
                                    <p className="ml-2 text-sm">{user?.name}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 items-center">
                                <p className="font-medium text-xl">Priority Ticket - 750 USDC</p>
                                <p>8 days, 9 nights total</p>
                                <p>Single or shared villa rooms</p>
                                <p>Hackathon attendance</p>
                                <p>Access to various onsite amenities</p>
                                <p>note: check Warpcast DMs for a receipt after!</p>
                            </div>
                            <BuyTicketTransaction userId={user?.id} />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}