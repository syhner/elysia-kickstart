import { Context } from 'elysia';
import { getSession } from '~/lib/auth';

export const isAuthenticated = async (ctx: Context<any>) => {
  const session = await getSession(ctx.request);
  if (!session) {
    ctx.set.status = 401;
    return 'Unauthorized';
  }
};
