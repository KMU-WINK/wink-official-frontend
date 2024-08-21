/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
  images: {
    domains: ["github.com"],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
