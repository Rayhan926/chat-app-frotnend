/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'localhost',
      'chat-app-backend-production-747d.up.railway.app',
    ],
  },
};

module.exports = nextConfig;
