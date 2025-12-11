import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
      },
      {
        protocol: "https",
        hostname: "newjams-images.scdn.co",
      },
      {
        protocol: "https",
        hostname: "dailymix-images.scdn.co",
      },
    ],
  },
};

export default nextConfig;
