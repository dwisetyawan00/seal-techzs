let userConfig = undefined
try {
  // try to import ESM first
  userConfig = await import('./v0-user-next.config.mjs')
} catch (e) {
  try {
    // fallback to CJS import
    userConfig = await import("./v0-user-next.config");
  } catch (innerError) {
    // ignore error
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async rewrites() {
    return [
      {
        "source": "/aggregator1/:path*",
        "destination": "https://aggregator.walrus-testnet.walrus.space/:path*"
      },
      {
        "source": "/aggregator2/:path*",
        "destination": "https://wal-aggregator-testnet.staketab.org/:path*"
      },
      {
        "source": "/aggregator3/:path*",
        "destination": "https://walrus-testnet-aggregator.redundex.com/:path*"
      },
      {
        "source": "/aggregator4/:path*",
        "destination": "https://https://walrus-testnet-aggregator.trusted-point.com/:path*"
      },
      {
        "source": "/publisher1/:path*",
        "destination": "https://publisher.walrus-testnet.walrus.space/:path*"
      },
      {
        "source": "/publisher2/:path*",
        "destination": "https://wal-publisher-testnet.staketab.org/:path*"
      },
      {
        "source": "/publisher3/:path*",
        "destination": "https://walrus-testnet-publisher.redundex.com/:path*"
      },
      {
        "source": "/publisher4/:path*",
        "destination": "https://walrus-testnet-publisher.trusted-point.com/:path*"
      },
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ];
  }
}

if (userConfig) {
  // ESM imports will have a "default" property
  const config = userConfig.default || userConfig

  for (const key in config) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...config[key],
      }
    } else {
      nextConfig[key] = config[key]
    }
  }
}

export default nextConfig
