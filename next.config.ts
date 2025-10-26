import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // Empty turbopack config to silence the warning
  turbopack: {},
  devIndicators: false
};

export default nextConfig;
