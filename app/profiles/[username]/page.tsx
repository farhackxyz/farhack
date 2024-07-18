/* eslint-disable @next/next/no-img-element */
// "use client"
import React from 'react';
// import { usePathname } from "next/navigation"
import ProfilePage from '../../components/profile-page';

export default function ProfileUsernamePage(){
    return(
        <div className="pt-5">
            <div className="text-white flex flex-col gap-1 items-start pt-5 pl-[3%]">
                <ProfilePage />
            </div>
        </div>
    )
}