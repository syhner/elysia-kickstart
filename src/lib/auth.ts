import { Auth, AuthConfig } from '@auth/core';
import GitHub from '@auth/core/providers/github';
import { Session } from '@auth/core/types';

export const authConfig: AuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
};

/**
 * Roundabout way to get the session since @auth/core doesn't export it
 */
export const getSession = async (request: Request) => {
  try {
    const url = `${new URL(request.url).origin}/api/auth/session`;

    const session = await Auth(
      new Request(url, {
        method: 'GET',
        body: request.body,
        headers: request.headers,
      }),
      authConfig
    );

    const sessionJson = (await session.json()) as Session;
    return sessionJson;
  } catch (err) {
    return null;
  }
};
