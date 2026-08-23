import { Controller, Get, Header, Res } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { Connection } from 'mongoose';
import { join } from 'path';

const SITE_DIR = join(__dirname, '..', 'site');
const HOME_HTML = readFileSync(join(SITE_DIR, 'index.html'), 'utf8');
const HOME_CSS = readFileSync(join(SITE_DIR, 'home.css'), 'utf8');
const HOME_JS = readFileSync(join(SITE_DIR, 'home.js'), 'utf8');
const APP_ICON = readFileSync(join(SITE_DIR, 'app-icon.png'));
const FAVICON = readFileSync(join(SITE_DIR, 'favicon.ico'));
const SERVER_VERSION = process.env.MDE_SERVER_VERSION || '0.1.0';

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
