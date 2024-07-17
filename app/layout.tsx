import "./globals.css";

import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { SessionProvider } from "next-auth/react";
import { auth } from '../auth';

export const metadata: Metadata = {
  title: "Hack by FarHack",
  description: "The ultimate Farcaster hackathon software, built by FarHack",
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
      <body className={`${GeistSans.className} dark bg-black`}>
        <SessionProvider basePath={"/api/auth"} session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
