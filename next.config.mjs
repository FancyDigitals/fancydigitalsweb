/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blog.fancydigitals.com.ng",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
  },

  // Permanent 301 redirects from old URLs to new ones
  async redirects() {
    return [
      {
        source: "/tools/ai-resume-builder",
        destination: "/free-ai-resume-builder",
        permanent: true,
      },
      {
        source: "/tools/ai-cover-letter",
        destination: "/free-ai-cover-letter",
        permanent: true,
      },
    ];
  },

  // Headers for FFmpeg.wasm on the video generator page only
  async headers() {
    return [
      {
        source: "/free-ai-video-ad-generator/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

export default nextConfig;