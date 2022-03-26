/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // 서버에서 호출되어야하는 모듈이 클라에서 실행되어야 할 때 여기에 적으면 에러 안뜸
    config.resolve.fallback = {
      fs: false,
      http: false,
      https: false,
      crypto: false,
      stream: false,
      querystring: false,
    };

    return config;
  },
};

module.exports = nextConfig;
