import type { Context } from 'hono';
import { EventDataSchema } from '../lib/schemas.js';
import { APIFault, resolveAPIErrors } from '../lib/error.js';

class EventsController {
  trackEvent = async (c: Context) => {
    try {
      const { success, data, error } = EventDataSchema.safeParse(
        await c.req.json(),
      );
      if (!success || !data) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join('.'), // Dot notation path
          message: err.message, // Error message
        }));

        throw new APIFault(formattedErrors, 401);
      }

      return c.json({ message: 'Captured' });
    } catch (error: any) {
      return resolveAPIErrors(c, error);
    }
  };
}

export const eventsController = new EventsController();
