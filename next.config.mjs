/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // IMPORTANT
  images: {
    unoptimized: true, // Required for static export
  },
  reactCompiler: true,
};

export default nextConfig;
