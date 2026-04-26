import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://aufrb49ors.ufs.sh/f/**"),
      new URL("https://kdib81rtmm.ufs.sh/f/**"),
    ],
    minimumCacheTTL: 2678400,
  },
};

export default withPayload(nextConfig);
