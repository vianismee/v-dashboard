import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'pixels.com'

    }]
  }
}


export default nextConfig;
