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
