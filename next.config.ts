import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: [env.IP_ADDRESS ?? ""],
};

export default nextConfig;
