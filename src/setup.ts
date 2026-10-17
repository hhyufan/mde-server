import * as dns from 'dns';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

/**
 * 强制 Node 的 DNS 解析器使用可靠支持 SRV 记录查询的公共 DNS，
 * 以满足 `mongodb+srv://` 连接串的解析需求。
 *
 * 许多家用路由器和国内 ISP DNS 会静默丢弃 SRV 查询或直接超时，
 * 导致 Mongoose 在发现 Atlas 分片主机时出现 `querySrv ETIMEOUT`。
 * Vercel 运行时的 DNS 通常没有这个问题，因此这里在那边基本等同于无操作，
 * 但保留也没有副作用。
 *
 * 如需覆盖，可通过环境变量设置 `DNS_SERVERS=1.1.1.1,8.8.8.8`。
 */
function ensureDnsServers(): void {
  const fromEnv = process.env.DNS_SERVERS?.split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const servers = fromEnv?.length
    ? fromEnv
    : ['1.1.1.1', '8.8.8.8', '223.5.5.5'];
  try {
    dns.setServers(servers);
  } catch {
    // `setServers` 遇到非法地址会抛错，这里静默回退到默认行为。
  }
}

ensureDnsServers();

/**
 * 本地独立启动入口（`main.ts`）与 Vercel serverless handler
 * 共用的 Nest 应用配置。
 */
export function setupApp(app: INestApplication): void {
  // The static homepage (and the embedded app build) uses a tiny inline
  // `window.process` shim before their bundles run, so allow inline scripts.
  // The live demo is iframed from GitHub Pages, which needs frame-src/connect-src.
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", "'unsafe-inline'"],
          'frame-src': ["'self'", 'https://hhyufan.github.io'],
          'connect-src': ["'self'", 'https://hhyufan.github.io'],
        },
      },
    }),
  );
  app.use((req, res, next) => {
    if (req.path.startsWith('/sync')) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');
    }
    next();
  });

  const configuredOrigins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const allowedOrigins = new Set([
    'http://tauri.localhost',
    'https://tauri.localhost',
    'tauri://localhost',
    'http://localhost:1420',
    'http://localhost:1421',
    'http://localhost:3300',
    'https://www.miaogu.xyz',
    'https://miaogu.xyz',
    ...configuredOrigins,
  ]);
  app.enableCors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.has(origin)) return callback(null, true);
      // Preview deployments (Vercel) and their static module requests carry an
      // Origin header; the embedded app bundle is served from the same site.
      if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return callback(null, true);
      return callback(new Error('Origin is not allowed by CORS'), false);
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
