import Elysia from 'elysia';

export const router = new Elysia({ prefix: '/api' }).get('/ping', () => 'pong');
