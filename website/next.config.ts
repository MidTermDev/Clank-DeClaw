import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
        pathname: "/ipfs/**",
      },
      {
        protocol: "https",
        hostname: "olive-familiar-horse-959.mypinata.cloud",
        pathname: "/ipfs/**",
      },
    ],
  },
  turbopack: {
    root: __dirname,
    resolveAlias: {
      fs: { browser: "./empty-module.js" },
      path: { browser: "./empty-module.js" },
      os: { browser: "./empty-module.js" },
      crypto: { browser: "./empty-module.js" },
    },
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
      crypto: false,
    };
    return config;
  },
};

export default nextConfig;
