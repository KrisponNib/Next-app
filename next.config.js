/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/drums", destination: "/drums/index.html" }];
  },
};

module.exports = nextConfig;
