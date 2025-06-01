import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '185.221.153.154',
        port: '',
        pathname: '/images/products/**',
      },
    ],
  },
};

export default nextConfig;
