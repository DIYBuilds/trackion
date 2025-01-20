import { Hono } from 'hono';
import { eventsController } from '../controllers/events.controller.js';

const router = new Hono();

router.post('/event', eventsController.trackEvent);

export default router;
