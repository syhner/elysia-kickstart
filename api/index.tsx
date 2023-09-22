/**
 * This file is the entrypoint for all Vercel Functions.
 */

import '../src/env'; // Validate env vars
import { app } from '../src/app';

export const config = { runtime: 'edge' };
export default async function handler(request: Request) {
  return app.fetch(request);
}
