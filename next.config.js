/* eslint-disable */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');
const configEnv = require('./env/config');

// dev,prod 환경변수 설정
const dotEnvResult = configEnv();

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

const { HOST, BACKEND_API, PORT, APP_ENV, GIT_COMMIT } = process.env;
const DEFAULT_PORT = 8080;

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const env = {
    HOST: HOST,
    PORT: PORT || DEFAULT_PORT,

    // next에서 서버, 클라이언트 동일하게 환경변수를 사용하려면 NEXT_PUBLIC_ prefix 필요
    NEXT_PUBLIC_HOST: HOST,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
    NEXT_PUBLIC_APP_ENV: APP_ENV,
    NEXT_PUBLIC_GIT_COMMIT: GIT_COMMIT,
    NEXT_PUBLIC_BACKEND_API: BACKEND_API,
  };

  if (HOST.includes('https://')) {
    env.IS_SSL = true;
  }

  const rewrites = () => {
    console.log('CURRENT URL : ', HOST);
    console.log('PROXY_URL : ', BACKEND_API);
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: `${BACKEND_API}/api/:path*`,
        },
      ],
    };
  };
  const redirects = () => {
    return [
      {
        source: '/payment/iniPayNext',
        destination: '/order',
        permanent: true,
      },
    ];
  };

  return {
    images: {
      // domains: ['domain image url'],
    },
    env,
    // FIXME: server.js테스트위해 주석
    rewrites,
    redirects,
    generateBuildId: async () => {
      return GIT_COMMIT || '123456789';
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  };
};
