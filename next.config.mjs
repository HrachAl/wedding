/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Self-contained production build (server + only the deps it needs) — what
  // the Docker image copies out, instead of shipping the full node_modules.
  output: "standalone",
  // Hide the Next.js dev indicator badge (dev-only overlay).
  devIndicators: false,
  images: {
    qualities: [70, 75, 82, 86],
  },
};

export default nextConfig;
