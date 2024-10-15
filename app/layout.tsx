/* eslint-disable @next/next/no-img-element */
import './globals.css'
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from '../auth';
import { karla } from "./lib/utils";
import FarhackLogo from "./components/icons/farhack-logo";
import SignInWithFarcaster from "./components/sign-in-with-farcaster";
import Head from 'next/head';
import Script from 'next/script';
import OnchainProviders from './components/onchain-providers';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Package2 } from 'lucide-react';

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
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const isAdmin = pathname && pathname.includes('/admin');

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
        <meta name="og:title" content="FarHack" />
        <title>FarHack</title>
        <meta name="application-name" content="FarHack" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FarHack" />
        <meta name="description" content="The ultimate Farcaster hackathon" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <body className={`${karla.className} dark bg-black`}>
        <OnchainProviders>
          <SessionProvider basePath={"/api/auth"} session={session}>
            {isAdmin ? children : 
                <div className="flex flex-col gap-4 min-h-screen">
                  <nav className="w-full bg-black/75 flex items-center justify-between p-4 pb-3 border-b border-white/20">
                    <div className="flex items-center gap-6">
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                      >
                        <FarhackLogo width={35} height={35} />
                        <p className={`text-white text-2xl mr-4 ${karla.className}`}>FarHack</p>
                      </Link>
                      <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        About
                      </Link>
                      <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Hackathons
                      </Link>
                      {/* <Link
                        href="#"
                        className="rounded-full bg-[#3a3a3a] text-white/75 hover:text-white px-2 py-1"
                      >
                        + New Hackathon
                      </Link> */}
                    </div>
                    <div className="flex items-center gap-6">
                      <SignInWithFarcaster />
                    </div>
                  </nav>
                  {children}
              </div>
            }
          </SessionProvider>
        </OnchainProviders>
      </body>
    </html>
  );
}