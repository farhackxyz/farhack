/* eslint-disable @next/next/no-img-element */
import './globals.css'
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from '../auth';
import { karla } from "./lib/utils";
import FarhackLogo from "./components/icons/farhack-logo";
import SignInWithFarcaster from "./components/sign-in-with-farcaster";
import Head from 'next/head';

export function generateMetadata(){
  return{
    metadataBase: new URL('https://farhack.xyz'),
    title: {
      default: 'FarHack',
      template: '%s | FarHack',
    },
    description: 'The ultimate Farcaster hackathon',
    openGraph: {
      title: 'FarHack',
      description: 'The ultimate Farcaster hackathon',
      images: ['https://i.imgur.com/4sLMVg2.png'],
      url: 'https://farhack.xyz',
      siteName: 'FarHack',
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  } as Metadata
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  const session = await auth()
  if (session?.user) {
    session.user = {
      id: session.user.id,
      name: session.user.name,
      image: session.user.image,
    }
  }

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={`${karla.className} dark bg-black`}>
        <SessionProvider basePath={"/api/auth"} session={session}>
          <div className="flex flex-col gap-4 min-h-screen">
            <a href="/">
              <div className="absolute top-6 left-8 flex flex-row gap-4 items-center">
                <FarhackLogo width={35} height={35} />
                <p className={`text-white text-2xl mr-4 ${karla.className}`}>FarHack</p>
              </div>
            </a>
            <div className="absolute top-4 right-8">
              <SignInWithFarcaster />
            </div>
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}