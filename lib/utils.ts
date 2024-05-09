import { Lora, Karla } from 'next/font/google';
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { OverallWinner, type MasonryGridImage, Prize } from './types';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const lora = Lora({
  subsets: ['latin'],
  display: 'swap'
});

export const karla = Karla({
  subsets: ['latin'],
  display: 'swap'
});

export const FARHACK_RECAP_BANNER_URL = "https://i.imgur.com/b82q35A.png";
export const FARHACK_C1_BANNER_URL = "https://i.imgur.com/J1Lch5m.png";

export const masonryGridImages: MasonryGridImage[] = [
  {
    "alt": "FarHack at FarCon poster",
    "src": "https://i.imgur.com/hAeS72B.jpeg"
  },
  {
    "alt": "dylsteck.eth announcing the winners of FarHack",
    "src": "https://i.imgur.com/x8OlhRZ.jpeg"
  },
  {
    "alt": "dylsteck.eth speaking at the FarHack final presentations",
    "src": "https://i.imgur.com/QKGQ7yz.jpeg"
  },
  {
    "alt": "dylsteck.eth and luciano at Chapter One at the end of FarHack",
    "src": "https://i.imgur.com/otnC5j6.png",
  },
  {
    "alt": "Everyone having breakfast and chatting about the hackathon projects outside on the last day of FarHack", 
    "src": "https://i.imgur.com/B7owKFc.png"
  },
  {
    "alt": "AI x Crypto meetup at FarHack",
    "src": "https://i.imgur.com/jwgNLtg.jpeg"
  },
  {
    "alt": "The Warpcast team briefly speaking on the first day of FarHack", 
    "src": "https://i.imgur.com/cfw7M27.jpeg"
  },
  {
    "alt": "Hackers posing for a picture on the final day of FarHack",
    "src": "https://i.imgur.com/uSyOrq2.jpeg"
  },
  {
    "alt": "The Cast Overflow team presenting their project at FarHack", 
    "src": "https://i.imgur.com/6upOLwH.jpeg"
  },
  {
    "alt": "The crowd watching final presentations on the final day of FarHack",
    "src": "https://i.imgur.com/nBKYw8s.jpeg"
  },
  {
    "alt": "Hackers watching a lightning talk on the first day", 
    "src": "https://i.imgur.com/3vi3Vyw.jpeg"
  },
  {
    "alt": "The voting frame for FarHack, made by @horsefacts",
    "src": "https://i.imgur.com/i783uiR.png"
  },
  {
    "alt": "Hackers posing for a picture on the final morning of FarHack",
    "src": "https://i.imgur.com/c3LGf5u.png"
  },
  {
    "alt": "Hackers posing for a picture with FarHack hats on the first day",
    "src": "https://i.imgur.com/TPG8EUm.png"
  },
  {
    "alt": "A presentation on the final day of FarHack", 
    "src": "https://i.imgur.com/dVJoAsy.png"
  },
  {
    "alt": "Hackers preparing for the second day", 
    "src": "https://i.imgur.com/jJG4LnG.png"
  }, 
  {
    "alt": "Hackers celebrating on the final day of FarHack", 
    "src": "https://i.imgur.com/2t8zAwM.png"
  }, 
  {
    "alt": "Steve from Pinata giving a lightning talk on the first day of FarHack",
    "src": "https://i.imgur.com/IYWrjD6.png"
  },
  {
    "alt": "Hackers pairing up on their project on the monitors at FarHack", 
    "src": "https://i.imgur.com/LCBAjNL.jpeg"
  },
  {
    "alt": "Attendees watching the final presentations", 
    "src": "https://i.imgur.com/MQYb1ZU.jpeg"
  }
]

export const overallWinners: OverallWinner[] = [
  {
    "place": 1,
    "name": "Memecaster", 
    "project_link": "https://beta.events.xyz/h/477226fc/teams/ca4159c2",
    "team": ["vmathur"],
    "description": "Reply to any cast with a meme"
  },
  {
    "place": 2,
    "name": "Cast Overflow", 
    "project_link": "https://beta.events.xyz/h/477226fc/teams/b0363025",
    "team": ["rubinovitz", "mattlee"],
    "description": "The developer Q&A site Stack Overflow built instead as a Farcaster client"
  },
  {
    "place": 3,
    "name": "Power Lift", 
    "project_link": "https://beta.events.xyz/h/477226fc/teams/4eede303",
    "team": ["banta", "gudjo.eth", "timcox"],
    "description": "A Farcaster Frame that gets more people Power Badges!"
  },
  {
    "place": 4,
    "name": "Pigimon", 
    "project_link": "https://beta.events.xyz/h/477226fc/teams/9bccb4aa",
    "team": ["ok", "pepperonick"],
    "description": "Pigimon are digital piggybank NFTs that evolve as your savings grows"
  },
  {
    "place": 5,
    "name": "Bookmark+", 
    "project_link": "https://beta.events.xyz/h/477226fc/teams/b69768dc",
    "team": ["jijin", "yuki"],
    "description": "Categorize, share, and discover content"
  }
]

export const prizes: Prize[] = [
  {
    "company": "Airstack", 
    "company_link": "https://airstack.xyz",
    "prizes": "Best use of Airstack in Frames, best use of Airstack in Cast Action, best use of Airstack in any Farcaster App or Client",
    "prizes_link": "https://www.bountycaster.xyz/bounty/0x85bb99b8dc17a51f79430b14b58cfddaafa2f7f4",
    "amounts": "$500 USDC per bounty",
    "winners": ["banta", "limone.eth", "ok"]
  },
  {
    "company": "Pinata", 
    "company_link": "https://pinata.cloud",
    "prizes": "Best use of Pinata in a Farcaster Frame, Best Use of Pinata in a Cast Action, Best Channel Specific Client using Pinata Farcaster API",
    "prizes_link": "",
    "amounts": "$500 per bounty",
    "winners": []
  },
  {
    "company": "Privy", 
    "company_link": "https://privy.io",
    "prizes": "Most engaging FC app, Get those users ongraph",
    "prizes_link": "https://www.bountycaster.xyz/bounty/0x5763794d811d3318838f7cb842aba4b5b1a34e76",
    "amounts": "$500 USDC per bounty",
    "winners": ["rubinovitz", "mattlee", "ok", "pepperonick", "yuki"]
  },
  {
    "company": "Base", 
    "company_link": "https://base.org",
    "prizes": "Commerce Bounty, Coinbase Wallet Bounty, Base Bounty",
    "prizes_link": "https://warpcast.com/base/0x77231ba6",
    "amounts": "$500 per bounty",
    "winners": ["lane", "ale", "limone.eth", "owl", "serg", "rmrfsudo", "inertia-social"]
  },
  {
    "company": "Optimism", 
    "company_link": "https://optimism.io",
    "prizes": "Best App or Frame that spans the Superchain",
    "prizes_link": "https://www.bountycaster.xyz/bounty/0x402c9384cf263ae4ea8371196143bf88e916152b",
    "amounts": "$500 USDC",
    "winners": ["yupuday"]
  },
  {
    "company": "frames.js", 
    "company_link": "https://framesjs.org",
    "prizes": "Most fun frame, Most innovative open frame, Most technical frame built with frames.js, Best frame for growing qDAU, Best action frame",
    "prizes_link": "https://warpcast.com/df/0x303c7b96",
    "amounts": "$500 per bounty",
    "winners": ["limone", "owl", "serg", "timcox", "banta", "gudjo.eth", "jijin", "yuki", "vmathur", "polats"]
  },
  {
    "company": "MetaMask", 
    "company_link": "https://metamask.io",
    "prizes": "Two bounties for integrating Farcaster data (and optionally enabling users to post to Farcaster) into MetaMask with MetaMask Snaps in a useful and meaningful way",
    "prizes_link": "",
    "amounts": "$500 USDC per bounty",
    "winners": []
  },
  {
    "company": "Dynamic", 
    "company_link": "https://dynamic.xyz",
    "prizes": "enabling adoption - the most seamless way of getting a Web2 user onto Farcaster, pushing the boundaries - using Farcaster to create a novel use case that wasn’t possible until now",
    "prizes_link": "",
    "amounts": "$500 USDC per bounty",
    "winners": []
  },
  {
    "company": "OpenRank", 
    "company_link": "https://openrank.com",
    "prizes": "Best use of OpenRank in apps/clients",
    "prizes_link": "",
    "amounts": "$500",
    "winners": []
  },
  {
    "company": "XMTP", 
    "company_link": "https://xmtp.org",
    "prizes": "Best use of an XMTP Bot in Farcaster, Best Open Frame, Best Use of XMTP to Send Notifications",
    "prizes_link": "",
    "amounts": "$500 per bounty",
    "winners": []
  }
]