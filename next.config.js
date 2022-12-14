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
const DEFAULT_PORT = 3000;

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
    console.log('--------> PROXY_URL : ', BACKEND_API);
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
    // 구글참조 test
    // assetPrefix: '.',
    // distDir: '.next',
    // webpack(config, options) {
    //   const prod = process.env.NODE_ENV === 'production';
    //   if (process.env.NODE_ENV === 'production') {
    //     // config.output.filename = 'js/[name].js?hash=[hash]';
    //     // config.output.chunkFilename = 'js/[name].js?hash=[hash]';
    //   }
    //   return config;
    // },

    images: {
      // domains: ['domain image url'],
    },
    env,
    rewrites,
    redirects,
    generateBuildId: async () => {
      console.log('BUILD_ID', GIT_COMMIT);
      return GIT_COMMIT || '123456789';
    },
    // i18n: {
    //   locales: ['en', 'ko'],
    //   defaultLocale: 'en',
    // },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  };
};
