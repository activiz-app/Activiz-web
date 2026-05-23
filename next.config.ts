import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
    allowedDevOrigins: [env.IP_ADDRESS ?? ""],
  };

export default nextConfig;
