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
        destination: "/dashboard/tools/ai-cover-letter",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;