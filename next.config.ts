import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // TODO: remove once the Featured Work project images live in /public/images.
    // picsum redirects to its fastly host, so both are allowed.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
