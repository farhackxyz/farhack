/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { headers } from 'next/headers';

const hackathonPages = [
    {
        name: 'Home',
        slug: '/'
    },
    {
        name: 'Tracks',
        slug: '/tracks'
    },
    {
        name: 'Bounties',
        slug: '/bounties'
    },
    {
        name: 'Schedule',
        slug: '/schedule'
    },
    // {
    //     name: 'Teams',
    //     slug: '/teams'
    // },
    // {
    //     name: 'Your team',
    //     slug: '/my-team'
    // }
]

function HackthonNavItem({ name, slug }: { name: string, slug: string }) {
    const headerList = headers();
    const pathname = headerList.get("x-current-path") as string;
    const parts = pathname.split('/').filter(Boolean);
    const finalPart = parts.length > 2 ? `/${parts.slice(2).join('/')}` : '/';
    return(
        <a href={`/hackathons/${parts[1]}${slug}`} className={`${finalPart === slug ? 'font-medium': ''} text-white text-md md:text-xl hover:text-gray-300 cursor-pointer w-auto whitespace-nowrap`}>
            {name}
        </a>
    )
}

export default function HackathonNav({ hackathon }: { hackathon: any }) {
    return(
        <div>
            <div className="text-white flex flex-col gap-1 items-start pt-5">
                <div className="flex flex-row gap-3 items-center mt-[7.5%] md:mt-[3.5%] ml-2 md:ml-0">
                    <img src={hackathon.square_image} alt={`${hackathon?.name} Hackathon`} loading="lazy" className="rounded w-[8%] md:w-[5%]" />
                    <p className="text-4xl">{hackathon.name ? hackathon.name : "Hackathon"}</p>
                </div>
                <div className="flex flex-row gap-2 md:gap-4 items-center mt-3.5 ml-2 md:ml-0 overflow-x-scroll">
                    {hackathonPages.map((page) => 
                        <HackthonNavItem key={page.slug} name={page.name} slug={page.slug} />
                    )}
                </div>
            </div>
        </div>
    )
}