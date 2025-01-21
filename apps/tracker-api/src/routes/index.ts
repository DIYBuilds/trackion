import { Hono } from 'hono';
import { eventsController } from '../controllers/events.controller.js';

const router = new Hono();

// Initialize the controller before setting up the route
(async () => {
  try {
    await eventsController.init();
    console.log('EventsController initialized successfully.');

    // Handle application shutdown
    process.on('SIGINT', async () => {
      console.log('Graceful shutdown initiated...');
      await eventsController.disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('Graceful shutdown initiated...');
      await eventsController.disconnect();
      process.exit(0);
    });
  } catch (err) {
    console.error('Failed to initialize EventsController:', err);
    process.exit(1);
  }
})();

router.post('/event', eventsController.trackEvent);

export default router;
