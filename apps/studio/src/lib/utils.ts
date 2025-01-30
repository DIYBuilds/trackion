import { pageLeaveSchema, pageViewSchema } from './default-json-schemas';
import { EventTemplate } from '@trackion/prisma';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jsonSchemaToZod(jsonSchema: string): z.ZodType<any> {
  const schema = JSON.parse(jsonSchema);
  return parseSchema(schema);
}

function parseSchema(schema: any): z.ZodType<any> {
  if (schema.type === 'object') {
    const shape: Record<string, z.ZodType<any>> = {};
    for (const key in schema.properties) {
      shape[key] = parseSchema(schema.properties[key]);
    }
    return z.object(shape);
  }

  if (schema.type === 'string') {
    return schema.format === 'date-time' ? z.string().datetime() : z.string();
  }

  if (schema.type === 'number') {
    return z.number();
  }

  if (schema.type === 'boolean') {
    return z.boolean();
  }

  if (schema.type === 'array' && schema.items) {
    return z.array(parseSchema(schema.items));
  }

  return z.any(); // Fallback
}

export function generateEventTemplates(
  property: string,
): Partial<EventTemplate>[] {
  const pageView: Partial<EventTemplate> = {
    name: 'Page View',
    description: 'Track page views',
    identifier: `${property}.page_view`,
    schema: pageViewSchema,
  };

  const pageLeave: Partial<EventTemplate> = {
    name: 'Page Leave',
    description: 'Track page leaves',
    identifier: `${property}.page_leave`,
    schema: pageLeaveSchema,
  };

  return [pageView, pageLeave];
}
