import { Controller, Get, Header, Req, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Request, Response } from 'express';
import { existsSync, readFileSync } from 'fs';
import { Connection } from 'mongoose';
import { extname, join } from 'path';

const SITE_DIR = join(__dirname, '..', 'site');
// Vercel compiles anything under src/ as CommonJS, which corrupts the ESM
// demo bundle. public/ is copied verbatim by `includeFiles` and served first.
const PUBLIC_DIR = join(process.cwd(), 'public');
const readPublicFirst = (name: string): string => {
  const publicFile = join(PUBLIC_DIR, name);
  return readFileSync(existsSync(publicFile) ? publicFile : join(SITE_DIR, name), 'utf8');
};
const HOME_HTML = readFileSync(join(SITE_DIR, 'index.html'), 'utf8');
const HOME_CSS = readFileSync(join(SITE_DIR, 'home.css'), 'utf8');
const HOME_JS = readFileSync(join(SITE_DIR, 'home.js'), 'utf8');
const MOKI_SITE_JS = readPublicFirst('moki-site.js');
const MOKI_SITE_CSS = readPublicFirst('moki-site.css');
const HOME_NEXT_JS = readPublicFirst('home-next.js');
const APP_ICON = readFileSync(join(SITE_DIR, 'app-icon.png'));
const MOKI_ICON = readFileSync(join(SITE_DIR, 'mokidown-icon.png'));
const MOKI_WORDMARK = readFileSync(join(SITE_DIR, 'mokidown-wordmark.webp'));
const FAVICON = readFileSync(join(SITE_DIR, 'favicon.ico'));
const APP_DIR = existsSync(join(PUBLIC_DIR, 'app')) ? join(PUBLIC_DIR, 'app') : join(SITE_DIR, 'app');
const SERVER_VERSION = process.env.MDE_SERVER_VERSION || '0.1.0';

const CONTENT_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
};

type DatabaseState = 'connected' | 'connecting' | 'disconnecting' | 'disconnected';

@Controller()
export class HomeController {
  constructor(@InjectConnection() private readonly database: Connection) {}

  @Get()
  @Header('Content-Type', 'text/html; charset=utf-8')
  @Header('Cache-Control', 'public, max-age=0, must-revalidate')
  getHome(@Res() response: Response): void {
    response.status(200).send(HOME_HTML);
  }

  @Get('assets/home.css')
  @Header('Content-Type', 'text/css; charset=utf-8')
  @Header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  getStyles(@Res() response: Response): void {
    response.status(200).send(HOME_CSS);
  }

  @Get('assets/home.js')
  @Header('Content-Type', 'application/javascript; charset=utf-8')
  @Header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  getScript(@Res() response: Response): void {
    response.status(200).send(HOME_JS);
  }

  // Interactive marketing bundle: the five feature scenes built from the
  // installer components (see mokidown's site/ project).
  @Get('assets/home-next.js')
  @Header('Content-Type', 'application/javascript; charset=utf-8')
  @Header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  getHomeNextScript(@Res() response: Response): void {
    response.status(200).send(HOME_NEXT_JS);
  }

  @Get('assets/moki-site.js')
  @Header('Content-Type', 'application/javascript; charset=utf-8')
  @Header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  getMokiSiteScript(@Res() response: Response): void {
    response.status(200).send(MOKI_SITE_JS);
  }

  @Get('assets/moki-site.css')
  @Header('Content-Type', 'text/css; charset=utf-8')
  @Header('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  getMokiSiteStyles(@Res() response: Response): void {
    response.status(200).send(MOKI_SITE_CSS);
  }

  // The live demo embeds the real app build (vite --mode demo). Vercel compiles
  // ESM under src/ to CommonJS, so the build lives on GitHub Pages and is
  // proxied here to keep the iframe same-origin (File System Access API works).
  @Get('app/*')
  async getAppAsset(@Req() request: Request, @Res() response: Response): Promise<void> {
    const relative = decodeURIComponent(request.path.replace(/^\/app\/?/, ''));
    if (!relative || relative.includes('..')) {
      response.status(404).send('Not found');
      return;
    }
    try {
      const upstream = await fetch(`https://hhyufan.github.io/mde-server/app/${relative}`, {
        cache: 'no-store',
      });
      if (!upstream.ok) {
        response.status(upstream.status).send('Not found');
        return;
      }
      const contentType =
        upstream.headers.get('content-type') ||
        CONTENT_TYPES[extname(relative)] ||
        'application/octet-stream';
      const body = Buffer.from(await upstream.arrayBuffer());
      response
        .status(200)
        .setHeader('Content-Type', contentType)
        .setHeader('Cache-Control', 'no-store')
        .send(body);
    } catch {
      response.status(502).send('Upstream unavailable');
    }
  }

  @Get('assets/mokidown-icon.png')
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  getMokiIcon(@Res() response: Response): void {
    response.status(200).send(MOKI_ICON);
  }

  @Get('assets/mokidown-wordmark.webp')
  @Header('Content-Type', 'image/webp')
  @Header('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  getMokiWordmark(@Res() response: Response): void {
    response.status(200).send(MOKI_WORDMARK);
  }

  @Get('assets/app-icon.png')
  @Header('Content-Type', 'image/png')
  @Header('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  getAppIcon(@Res() response: Response): void {
    response.status(200).send(APP_ICON);
  }

  @Get('favicon.ico')
  @Header('Content-Type', 'image/x-icon')
  @Header('Cache-Control', 'public, max-age=86400, stale-while-revalidate=604800')
  getFavicon(@Res() response: Response): void {
    response.status(200).send(FAVICON);
  }

  @Get('health')
  @Header('Cache-Control', 'no-store')
  getHealth() {
    const database = this.getDatabaseState(this.database.readyState);
    return {
      status: database === 'connected' ? 'operational' : 'degraded',
      services: {
        api: 'operational',
        database,
      },
      version: SERVER_VERSION,
      checkedAt: new Date().toISOString(),
    };
  }

  private getDatabaseState(readyState: number): DatabaseState {
    if (readyState === 1) return 'connected';
    if (readyState === 2) return 'connecting';
    if (readyState === 3) return 'disconnecting';
    return 'disconnected';
  }
}
