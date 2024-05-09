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
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <meta property="fc:frame" content="vNext"/>
      <meta property="fc:frame:image:aspect_ratio" content="1:1"/>
      <meta property="fc:frame:image" content="https://i.imgur.com/b82q35A.png"/>
      <meta property="fc:frame:post_url" content="https://farhack.xyz/api"/>
      <meta property="fc:frame:button:1" content="View images" data-value="next"/>
      <meta property="fc:frame:button:1:action" content="post"/>
      <meta property="fc:frame:button:2" content="Learn more" data-type="redirect" data-value="_r:https://farhack.xyz"/>
      <meta property="fc:frame:button:2:action" content="post_redirect"/>
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
