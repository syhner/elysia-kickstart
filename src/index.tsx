import { html } from '@elysiajs/html';
import { Elysia } from 'elysia';

const app = new Elysia()
  .use(html())
  .get('/', () => <h1>Hello, World!</h1>)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
