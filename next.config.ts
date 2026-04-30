import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jyurineko.website",
        pathname: "/**",
      },
    ],
  },
  // SEO: 添加 trailingSlash 使 URL 更规范
  trailingSlash: true,
};

export default nextConfig;