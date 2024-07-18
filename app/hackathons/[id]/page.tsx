/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react';
import { usePathname } from "next/navigation"
import { hackathons } from '../../components/login';
import { images } from '../../lib/utils';

export default function HackathonIdPage(){
    const pathname = usePathname();
    const pathnameParts = pathname.split('/');
    const id = pathnameParts[2];
    const hackathon = hackathons.find((hackathon) => hackathon.id === id);
    const edconBanner = images.find((image) => image.alt === "Edcon 2024 Hackathon Powered by FarHack Banner");


    return(
        <div className="pt-5">
            <div className="text-white flex flex-col gap-1 items-start pt-5 pl-[3%]">
                <div className="flex flex-row gap-4 items-center mt-[3.5%]">
                    <img src={hackathon?.image} alt={`${hackathon?.name} Hackathon`} loading="lazy" className="rounded w-[4%]"/>
                    <p className="text-2xl font-medium">{hackathon?.name ? `${hackathon.name} Hackathon` : 'this hackathon'}</p>
                </div>
                <div className="w-[98%] border border-1 border-white rounded-md p-5 mt-5 flex flex-col items-center">
                    <p className="font-medium"><span className="font-semibold text-lg">Create</span> or join a team to get started!</p>
                </div>
                <div className="pt-10 flex flex-col gap-2 items-start">
                    <p className="text-3xl font-medium">Schedule</p>
                    <div className="text-lg">
                        <p>Dates: July 20 - 26, 2024</p>
                        <p>Full schedule coming soon!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}