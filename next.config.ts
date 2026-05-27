import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com https://*.sanity-cdn.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: cdn.sanity.io https://*.sanity-cdn.com https://*.googleusercontent.com https://*.spline.design https://spline.design; font-src 'self'; connect-src 'self' https://*.sanity.io https://registry.npmjs.org https://*.sanity-cdn.com wss: https://prod.spline.design https://*.spline.design https://spline.design https://unpkg.com; media-src 'self'; object-src 'none'; frame-src 'self' https://my.spline.design https://*.spline.design https://spline.design; child-src 'self' blob: https://my.spline.design https://*.spline.design https://spline.design; worker-src 'self' blob: https://unpkg.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
