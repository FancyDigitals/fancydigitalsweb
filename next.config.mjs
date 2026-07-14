/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },

  serverExternalPackages: [
    "@remotion/renderer",
    "@remotion/bundler",
    "@remotion/compositor-win32-x64-msvc",
    "@remotion/compositor-linux-x64-gnu",
    "@remotion/compositor-linux-x64-musl",
    "@remotion/compositor-darwin-x64",
    "@remotion/compositor-darwin-arm64",
    "esbuild",
  ],

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
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(config.externals || []),
        "@remotion/renderer",
        "@remotion/bundler",
        "esbuild",
      ];
    }
    return config;
  },

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
    {
      source: "/free-ai-video-ad-generator",
      destination: "/free-ai-video-generator",
      permanent: true,
    },
    {
      source: "/free-ai-video-ad-generator/:path*",
      destination: "/free-ai-video-generator",
      permanent: true,
    },
    {
      source: "/dashboard/video-ai",
      destination: "/video-ai",
      permanent: false,
    },
    {
      source: "/dashboard/video-ai/:path*",
      destination: "/video-ai",
      permanent: false,
    },
  ];
},

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