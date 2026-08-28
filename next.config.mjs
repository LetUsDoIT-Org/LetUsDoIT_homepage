/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export was required by GitHub Pages. On Vercel the site runs as a
  // normal Next.js app so the contact form can post to a server action, and
  // next/image optimisation is available again.
  reactStrictMode: true,

  // The site now runs a server, so it gets the headers a static bucket
  // never needed.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
