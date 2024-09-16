// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wink-official-dev.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 't1.daumcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'blog.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
