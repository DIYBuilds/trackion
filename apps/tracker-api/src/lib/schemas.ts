import { z } from 'zod';

export enum EventType {
  PageView = 'pageview',
  Click = 'click',
  FormSubmission = 'form_submission',
  TimeOnPage = 'time_on_page',
  PageLeave = 'pageleave',
  Scroll = 'scroll',
}

export const EventDataSchema = z.object({
  eventType: z.string(),
  page: z.string(),
  referrer: z.string(),
  sessionId: z.string(),
  timestamp: z.string(),
  url: z.string(),
  additionalData: z.any().optional(),
});
