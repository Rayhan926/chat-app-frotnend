/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'localhost',
      'chat-app-node-express-backend.herokuapp.com',
    ],
  },
};

module.exports = nextConfig;
