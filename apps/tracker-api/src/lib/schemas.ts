import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export enum EventType {
  PageView = 'pageview',
  Click = 'click',
  FormSubmission = 'form_submission',
  TimeOnPage = 'time_on_page',
  PageLeave = 'pageleave',
  Scroll = 'scroll',
}

export const EventDataSchema = z.object({
  eventId: z.string().default(() => uuidv4()),
  eventType: z.string(),
  page: z.string(),
  referrer: z.string(),
  sessionId: z.string(),
  timestamp: z.string(),
  url: z.string(),
  additionalData: z.any().optional(),
});
