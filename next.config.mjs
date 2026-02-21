/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: '/your-repo-name', // Un-comment this if deploying to GitHub Pages under a subpath
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
