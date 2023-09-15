import { describe, expect, it } from 'bun:test';
import { app } from '~/index';

describe('api', () => {
  it('ping endpoint returns pong', async () => {
    const response = await app
      .handle(new Request('http://localhost/api/ping'))
      .then((res) => res.text());

    expect(response).toBe('pong');
  });
});
