import { getFrameMetadata } from 'frog/next'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { FARHACK_C1_BANNER_URL } from '@/lib/utils'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })
 
export async function generateMetadata(): Promise<Metadata> {
  const url = process.env.VERCEL_URL || 'http://localhost:3000'
  const frameMetadata = await getFrameMetadata(`${url}/api`)
  return {
    title: 'FarHack',
    description: 'The ultimate Farcaster hackathon',
    metadataBase: new URL("https://farhack.xyz"),
    openGraph: {images:[FARHACK_C1_BANNER_URL]},
    other: frameMetadata,
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
     <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
