/** @type {import('next').NextConfig} */

const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  // put the rest of config here
  experimental: {
    newNextLinkBehavior: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  },
  swcMinify: true,
});
