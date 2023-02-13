// eslint-disable-next-line
const configEnv = require('./env/config');
configEnv();
const next = require('next');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const { PORT, NEXT_PUBLIC_BACKEND_API } = app.server.nextConfig.env;
  const server = express();
  server.set('trust proxy', true);
  server.use(
    '/api',
    createProxyMiddleware({
      target: NEXT_PUBLIC_BACKEND_API,
      pathRewrite: { '^/api': '/api' },
      changeOrigin: true,
    })
  );
  server.get('*', (req, res) => handle(req, res));
  server.listen(PORT, () => console.log(`SERVER ON ${PORT}`));
});
module.exports = app;
