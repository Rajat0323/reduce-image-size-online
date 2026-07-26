const {
  getNextConfigRedirects,
} = require("./src/lib/consolidationRedirects");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/ml-to-oz-calculator",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ml-to-oz",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ml-oz-converter",
        destination: "/",
        permanent: true,
      },
      ...getNextConfigRedirects(),
    ];
  },
  async rewrites() {
    return [
      {
        source: "/8f3c2a1e9d4b7c6f5a0e.txt",
        destination: "/api/indexnow-key",
      },
    ];
  },
};

module.exports = nextConfig;
