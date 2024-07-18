import "./globals.css";

import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { SessionProvider } from "next-auth/react";
import { auth } from '../auth';
import { images, karla } from "./lib/utils";
import FarhackLogo from "./components/icons/farhack-logo";
import SignInWithFarcaster from "./components/sign-in-with-farcaster";
import WarpcastIcon from "./components/icons/warpcast-icon";
import GithubIcon from "./components/icons/github-icon";

export const metadata: Metadata = {
  title: "FarHack",
  description: "The ultimate Farcaster hackathon",
  openGraph: {
    images: images.map((image: { src: string, alt: string }) => image.src)
  }
};

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
            <div className="pl-5 pb-10 md:pb-0 pt-0 md:pt-7.5 mb-7.5 md:mb-0 flex flex-row gap-4 items-center relative md:absolute bottom-0">
              <a target="_blank" href="https://warpcast.com/~/channel/farhack">
                <WarpcastIcon />
              </a>
              <a target="_blank" href="https://github.com/dylsteck/farhack">
                <GithubIcon />
              </a>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}