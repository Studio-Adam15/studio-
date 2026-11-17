import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === 'production';
const SHARED_APP_URL =
  process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
    ? process.env.APP_URL.replace(/\/+$/, '')
    : 'https://ais-pre-xwdnjzufi4lumeu74ktxia-664548807468.europe-west2.run.app';

function resolvePublicOrigin(req: Request): string {
  const forwardedHost = req.get('x-forwarded-host')?.split(',')[0]?.trim();
  const rawHost = forwardedHost || req.get('host') || '';
  const forwardedProto = req.get('x-forwarded-proto')?.split(',')[0]?.trim();

  if (
    rawHost &&
    !rawHost.startsWith('localhost') &&
    !rawHost.startsWith('127.0.0.1') &&
    !rawHost.startsWith('ais-dev-')
  ) {
    const proto = forwardedProto || 'https';
    return `${proto}://${rawHost}`;
  }

  return SHARED_APP_URL;
}

function injectOpenGraphUrls(html: string, req: Request): string {
  const origin = resolvePublicOrigin(req);
  const pagePath = req.originalUrl.split('?')[0] || '/';
  const pageUrl = `${origin}${pagePath === '/' ? '/' : pagePath}`;
  const ogImageUrl = `${origin}/og-preview.jpg`;

  return html
    .replace(/__OG_URL__/g, pageUrl)
    .replace(/__OG_IMAGE_URL__/g, ogImageUrl)
    .replace(
      /https:\/\/ais-pre-xwdnjzufi4lumeu74ktxia-664548807468\.europe-west2\.run\.app\/og-preview\.jpg/g,
      ogImageUrl
    )
    .replace(
      /https:\/\/ais-pre-xwdnjzufi4lumeu74ktxia-664548807468\.europe-west2\.run\.app\//g,
      pageUrl
    );
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true });
  });

  // Explicitly serve public assets (og-preview.jpg, logos, portfolio media, static zip)
  // so social link crawlers get direct fast responses with proper MIME types.
  const publicDir = path.resolve(__dirname, 'public');
  app.use(
    express.static(publicDir, {
      index: false,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.zip')) {
          res.setHeader('Content-Type', 'application/zip');
        }
      },
    })
  );

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.get('*', async (req: Request, res: Response, next) => {
      if (req.originalUrl.startsWith('/api/')) {
        next();
        return;
      }

      try {
        const templatePath = path.resolve(__dirname, 'index.html');
        let html = await fs.readFile(templatePath, 'utf-8');
        html = await vite.transformIndexHtml(req.originalUrl, html);
        html = injectOpenGraphUrls(html, req);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));

    app.get('*', async (req: Request, res: Response, next) => {
      if (req.originalUrl.startsWith('/api/')) {
        next();
        return;
      }

      try {
        const indexPath = path.join(distDir, 'index.html');
        let html = await fs.readFile(indexPath, 'utf-8');
        html = injectOpenGraphUrls(html, req);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(html);
      } catch (err) {
        next(err);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`STUDIO ADAM server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
