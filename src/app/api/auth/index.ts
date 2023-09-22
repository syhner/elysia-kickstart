import { Auth } from '@auth/core';
import { authConfig } from '~/lib/auth';
import { createElysia } from '~/util/elysia';

export const routes = createElysia({ prefix: '/auth' })
  .get('/*', async (ctx) => {
    const res = await Auth(ctx.request, authConfig);
    return res;
  })
  .post('/*', async (ctx) => {
    const res = await Auth(ctx.request, authConfig);
    return res;
  });
