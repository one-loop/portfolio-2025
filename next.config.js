/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, noimageindex',
          },
        ],
      },
      {
        source: '/gallery/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noimageindex',
          },
        ],
      },
      {
        source: '/projectthumbnails/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, noimageindex',
          },
        ],
      },
      {
        // Prevent PDFs / Resumes from being indexed in Google Search
        source: '/:path*\\.pdf',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        // Block indexing of photos and gallery json
        source: '/photos/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noimageindex',
          },
        ],
      },
      {
        source: '/gallery.json',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noimageindex',
          },
        ],
      },
      {
        // Block admin routes
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        // Default security headers across all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
