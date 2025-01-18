import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
  },
  reactStrictMode: true,
};

export default nextConfig;
