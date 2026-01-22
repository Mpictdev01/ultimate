import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next_new",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fzhdaksfjwndeuvvojkj.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
