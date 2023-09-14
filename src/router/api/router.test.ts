import { describe, expect, it } from 'bun:test';
import { router } from './router';

describe('api', () => {
  it('ping endpoint returns pong', async () => {
    const response = await router
      .handle(new Request('http://localhost/api/ping'))
      .then((res) => res.text());

    expect(response).toBe('pong');
  });
});
