import { Lora, Karla } from 'next/font/google';

export const lora = Lora({
  subsets: ['latin'],
  display: 'swap'
});

export const karla = Karla({
  subsets: ['latin'],
  display: 'swap'
});

const isDev = process.env.NODE_ENV === 'development';

export const BASE_URL = isDev 
  ? 'http://localhost:3000' 
  : process.env.VERCEL_URL || 'https://farhack.xyz';

export const BANNER_IMG = 'https://i.imgur.com/4sLMVg2.png';