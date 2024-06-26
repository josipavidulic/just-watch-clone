/** @type {import('next').NextConfig} */

const isDocker = process.env.IS_DOCKER === "true";
const nextConfig = {
  output: isDocker ? "standalone" : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
      },
    ],
  },
};

export default nextConfig;
