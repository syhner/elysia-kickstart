import Elysia from 'elysia';
import { router as authRouter } from './auth/router';

export const router = new Elysia({ prefix: '/api' })
  .use(authRouter)
  .get('/ping', () => 'pong');
