/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com",
      "scontent.fnak3-1.fna.fbcdn.net",
      "cdn.sanity.io",
      "rickandmortyapi.com",
      "images.unsplash.com",
      "n14jpqkv.api.sanity.io",
      "lh3.googleusercontent.com",
      "storage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
