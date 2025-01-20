import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import router from './routes/index.ts';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/api/v1', router);

const port = 8000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
