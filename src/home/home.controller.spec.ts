import { Connection } from 'mongoose';
import { HomeController } from './home.controller';

describe('HomeController', () => {
  it('returns a healthy public status without infrastructure details', () => {
    const controller = new HomeController({ readyState: 1 } as Connection);

    const result = controller.getHealth();

    expect(result.status).toBe('operational');
    expect(result.services).toEqual({ api: 'operational', database: 'connected' });
    expect(result.version).toBeTruthy();
    expect(result).not.toHaveProperty('databaseUri');
    expect(result).not.toHaveProperty('environment');
  });

  it('reports a degraded state while the database is unavailable', () => {
    const controller = new HomeController({ readyState: 0 } as Connection);

    expect(controller.getHealth()).toMatchObject({
      status: 'degraded',
      services: { api: 'operational', database: 'disconnected' },
    });
  });
});

describe('Plugin documentation', () => {
  const controller = new HomeController({ readyState: 0 } as Connection);
  function response() { const result: any = {}; for (const name of ['status','send','setHeader','redirect']) result[name] = jest.fn(() => result); return result; }
  it('serves the generated plugin documentation and stylesheet', () => {
    const res = response(); controller.getPluginDocumentation({ path: '/docs/plugins/index.html' } as any, res);
    expect(res.status).toHaveBeenCalledWith(200); expect(res.send.mock.calls[0][0].toString()).toContain('SDK 1.3.0');
    const css = response(); controller.getPluginDocumentation({ path: '/docs/plugins/plugin-docs.css' } as any, css); expect(css.setHeader).toHaveBeenCalledWith('Content-Type', 'text/css; charset=utf-8');
  });
  it('redirects the directory URL and rejects paths outside the flat documentation directory', () => {
    const canonical = response(); controller.getPluginDocumentation({ path: '/docs/plugins' } as any, canonical); expect(canonical.redirect).toHaveBeenCalledWith(308, '/docs/plugins/');
    const rejected = response(); controller.getPluginDocumentation({ path: '/docs/plugins/../../package.json' } as any, rejected); expect(rejected.status).toHaveBeenCalledWith(404);
  });
});
