import { Auth } from '@auth/core';
import Elysia from 'elysia';
import { authConfig } from '~/lib/auth';

export const router = new Elysia({ prefix: '/auth' })
  .get('/*', async (ctx) => {
    const res = await Auth(ctx.request, authConfig);
    return res;
  })
  .post('/*', async (ctx) => {
    const res = await Auth(ctx.request, authConfig);
    return res;
  });
