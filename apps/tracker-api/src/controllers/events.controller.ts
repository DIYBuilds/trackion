import type { Context } from 'hono';
import { EventDataSchema } from '../lib/schemas.js';
import { APIFault, resolveAPIErrors } from '../lib/error.js';
import kafka from '../lib/kafka.ts';
import type { Producer } from 'kafkajs';
class EventsController {
  private producer: Producer;
  private isInitialized: boolean;
  constructor() {
    this.producer = kafka.producer({
      transactionTimeout: 30000,
    });

    this.isInitialized = false;
  }

  async init() {
    if (!this.isInitialized) {
      await this.producer.connect();
      this.isInitialized = true;
      console.log('Kafka producer connected.');
    }
  }
  async disconnect() {
    if (this.isInitialized) {
      await this.producer.disconnect();
      this.isInitialized = false;
      console.log('Kafka producer disconnected.');
    }
  }

  trackEvent = async (c: Context) => {
    try {
      const result = EventDataSchema.safeParse(await c.req.json());
      if (!result.success) {
        const formattedErrors = result.error.errors.map((err) => ({
          path: err.path.join('.'), // Dot notation path
          message: err.message, // Error message
        }));

        throw new APIFault(formattedErrors, 401);
      }
      const eventData = result.data;
      await this.producer.send({
        topic: 'events',
        messages: [
          {
            key: eventData.eventId, // Example: Use event ID as the key.
            value: JSON.stringify(eventData),
          },
        ],
      });
      return c.json({ message: 'Captured' });
    } catch (error: any) {
      return resolveAPIErrors(c, error);
    }
  };
}

const eventsController = new EventsController();
export { eventsController };
