import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { Layout } from './components/Layout';
import { router as apiRouter } from './router/api/router';
import { router as todosRouter } from './router/todos/router';

export const app = new Elysia()
  .use(swagger())
  .use(apiRouter)
  .use(html())
  .use(staticPlugin())
  .get('/dist/globals.css', () => Bun.file('./dist/globals.css'))
  .use(todosRouter)
  .get('/', () => (
    <Layout>
      <div hx-get='/todos' hx-trigger='load' hx-swap='innerHTML'></div>
    </Layout>
  ));

app.listen(process.env.PORT ?? 3000, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at http://${hostname}:${port}`);
});
