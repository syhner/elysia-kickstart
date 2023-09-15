import Elysia from 'elysia';
import { routes as authRoutes } from './auth';

export const routes = new Elysia({ prefix: '/api' })
  .use(authRoutes)
  .get('/ping', () => 'pong');
