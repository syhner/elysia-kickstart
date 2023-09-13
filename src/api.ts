import Elysia from 'elysia';

export const api = () =>
  new Elysia({ prefix: '/api' }).get('/ping', () => 'pong');
