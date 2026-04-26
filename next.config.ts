import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://aufrb49ors.ufs.sh/f/**"),
      new URL("https://kdib81rtmm.ufs.sh/f/**"),
      new URL("https://*.public.blob.vercel-storage.com/**"),
    ],
    minimumCacheTTL: 2678400,
  },
  cacheComponents: true
};

export default withPayload(nextConfig);
