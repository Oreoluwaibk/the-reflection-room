import type { NextConfig } from "next";
import path from "path";

// Parent Desktop/yarn.lock confuses Turbopack's root detection — pin to this app.
const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
