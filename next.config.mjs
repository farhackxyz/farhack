/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'i.imgur.com',
          '*',
        ],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.imgur.com',
            port: '',
            pathname: '/**',
          },
        ],
    },
};

export default nextConfig;