import { Auth } from '@auth/core';
import Elysia from 'elysia';
import { authConfig } from '~/lib/auth';

/**
 * Elysia's ctx.request is always http://
 * This function returns a new Request object with https://
 * under a condition, otherwise the redirect_uri will mismatch
 * and authentication will fail
 */
const fixCtxRequest = (request: Request) => {
  if (process.env.NODE_ENV !== 'production') {
    return request;
  }

  const httpsUrl = request.url.replace('http://', 'https://');

  const newRequest = new Request(httpsUrl, {
    body: request.body,
    headers: request.headers,
    method: request.method,
  });

  return newRequest;
};

export const router = new Elysia({ prefix: '/auth' })
  .get('/*', async (ctx) => {
    console.log(ctx.request);
    const res = await Auth(fixCtxRequest(ctx.request), authConfig);
    return res;
  })
  .post('/*', async (ctx) => {
    const res = await Auth(fixCtxRequest(ctx.request), authConfig);
    return res;
  });
