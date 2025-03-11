/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'cdn.shopify.com',
        'images.ctfassets.net'
      ],
      },
      eslint: {
        ignoreDuringBuilds: true, // Disable ESLint during builds
      },
};

export default nextConfig;
