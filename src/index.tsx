import { html } from '@elysiajs/html';
import { staticPlugin } from '@elysiajs/static';
import { Elysia } from 'elysia';
import { api } from './api';
import { Layout } from './components/Layout';

const app = new Elysia()
  .use(api())
  .use(html())
  .use(staticPlugin())
  .get('/dist/globals.css', () => Bun.file('./dist/globals.css'))
  .get('/', () => (
    <Layout>
      <h1 class='text-lg'>Hello, World!</h1>
      <button hx-get='/api/ping' hx-swap='innerHTML' hx-target='#pong'>
        Ping the server
      </button>
      <div id='pong'>ping request not sent...</div>
    </Layout>
  ));

app.listen(3000, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at http://${hostname}:${port}`);
});
