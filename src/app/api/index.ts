import { createElysia } from '~/util/elysia';
import { routes as authRoutes } from './auth';

export const routes = createElysia({ prefix: '/api' })
  .use(authRoutes)
  .get('/ping', () => 'pong');
