/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
      "www.youtube.com",
    ],
    experimental: {
      serverComponentsExternalPackages: ["cloudinary", "graphql-request"],
    },
  },
};

module.exports = nextConfig;
