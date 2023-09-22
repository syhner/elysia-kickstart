import { Auth, AuthConfig } from '@auth/core';
import GitHub from '@auth/core/providers/github';
import { Session } from '@auth/core/types';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { and, eq } from 'drizzle-orm';
import { accounts, users } from '~/db/schemas/auth';
import { env } from '~/env';
import { db } from './db';

// https://github.com/nextauthjs/next-auth/issues/8377#issuecomment-1694720111
function modifiedDrizzleAdapter() {
  return {
    // @ts-expect-error TODO: resolve type error
    ...DrizzleAdapter(db),
    async getUserByAccount(providerAccountId: any) {
      const results = await db
        .select()
        .from(accounts)
        .leftJoin(users, eq(users.id, accounts.userId))
        .where(
          and(
            eq(accounts.provider, providerAccountId.provider),
            eq(accounts.providerAccountId, providerAccountId.providerAccountId)
          )
        )
        .get();

      return results?.user ?? null;
    },
  };
}

export const authConfig: AuthConfig = {
  // @ts-expect-error Required since accounts.email is nullable (with minimal GitHub scope)
  adapter: modifiedDrizzleAdapter(),
  trustHost: true,
  secret: env.AUTH_SECRET,
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
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
