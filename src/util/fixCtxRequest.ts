import { env } from '~/env';

/**
 * Bun's request.url is always http:// even if the request is sent with HTTPS
 * unless a valid `tls` object is provided, which is not possible when using
 * a manage service for TLS. Instead, this function fixes the request.url
 * so that the redirect_uri will match during authentication. This is not
 * done on the edge since the Bun runtime is not used.
 */
export const fixCtxRequest = (request: Request) => {
  if (env.NODE_ENV !== 'production' || env.RUNTIME === 'edge') {
    return {};
  }

  const httpsUrl = request.url.replace('http://', 'https://');

  const newRequest = new Request(httpsUrl, {
    body: request.body,
    headers: request.headers,
    method: request.method,
    cache: request.cache,
    credentials: request.credentials,
    integrity: request.integrity,
    keepalive: request.keepalive,
    mode: request.mode,
    redirect: request.redirect,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
    signal: request.signal,
  });

  return { request: newRequest };
};
