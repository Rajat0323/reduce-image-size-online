/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
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
      {
        source: "/blog/ml-to-oz-calculator-guide",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/ml-to-oz",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/reduce-image-size-to-50kb",
        destination: "/blog/reduce-image-size-to-50kb-online",
        permanent: true,
      },
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
