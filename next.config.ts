import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Be cautious with using "**" - see explanation below
      },
    ],
  },
};

export default nextConfig;
