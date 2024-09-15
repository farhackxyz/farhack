import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FarHack',
    short_name: 'FarHack',
    description: 'The ultimate Farcaster hackathon',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}