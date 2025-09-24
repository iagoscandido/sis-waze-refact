import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: "incremental",
  },
  staticPageGenerationTimeout: 30,
};

export default nextConfig;
