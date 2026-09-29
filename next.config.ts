import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: menghasilkan folder `out/` berisi HTML statis,
  // cocok untuk deploy ke Vercel maupun hosting statis lainnya.
  output: "export",
};

export default nextConfig;
