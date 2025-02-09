/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.dummyjson.com",
                port: "",
                pathname: "/**",
          },
          {
              protocol: "https",
              hostname: "images.pexels.com",
              port: "",
              pathname: "/**",
        },
        ],
    }
};

export default nextConfig;
