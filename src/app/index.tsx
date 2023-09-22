import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';
import { SignIn, SignOut } from '~/components/auth';
import { Layout } from '~/components/Layout';
import { getSession } from '~/lib/auth';
import { createElysia } from '~/util/elysia';
import { routes as apiRoutes } from './api';
import { routes as todosRoutes } from './todos';

export const app = createElysia()
  // Plugins on all routes
  .use(swagger())

  // Non-page routes
  .use(apiRoutes)

  // Plugins on all page routes
  .use(html())

  // Page routes
  .use(todosRoutes)
  .get('/', async (ctx) => {
    const session = await getSession(ctx.request);

    return (
      <Layout>
        <div class='px-6 py-6'>
          {session ? (
            <SignOut />
          ) : (
            <SignIn innerText='Sign in to modify todos' />
          )}
          <div class='py-3'></div>
          <div hx-get='/todos' hx-trigger='load' hx-swap='innerHTML'></div>
        </div>
      </Layout>
    );
  })
  .get('/url', (ctx) => ctx.request.url);

export type App = typeof app;
