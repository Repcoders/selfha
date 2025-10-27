/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'localhost', 'loremflickr.com', 'res.cloudinary.com'],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
