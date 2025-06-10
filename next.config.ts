import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: 
  {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.mafia-next.ru',
        port: '',
        pathname: '/images/products/**',
      },
    ],
  },
};

export default nextConfig;
