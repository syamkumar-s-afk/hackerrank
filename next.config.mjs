/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/test',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
