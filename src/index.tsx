import { html } from '@elysiajs/html';
import { Elysia } from 'elysia';

const app = new Elysia().use(html()).get('/', () => <h1>Hello, World!</h1>);

app.listen(3000, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at http://${hostname}:${port}`);
});
