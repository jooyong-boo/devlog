/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'placehold.co',
      },
      {
        hostname: 'devlog-local.s3.ap-northeast-2.amazonaws.com',
      },
      {
        hostname: 'devlog-production.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
