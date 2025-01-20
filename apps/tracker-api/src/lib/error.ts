import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export class APIFault {
  name: string;
  message: string | object;
  statusCode: ContentfulStatusCode;
  stack?: string;

  constructor(message: string | object, statusCode: ContentfulStatusCode) {
    this.name = 'APIFault'; // Custom error name
    this.message = message;
    this.statusCode = statusCode;
  }

  // Optionally, you can implement a method to log or format the error
  formatError() {
    return {
      error: this.message,
    };
  }
}

export function resolveAPIErrors(
  c: Context,
  error: any,
  route: string = '[API_ERROR]',
) {
  const formattedError = error.formatError();

  console.log(route, {
    ...formattedError,
    statusCode: error.statusCode || 500,
  });

  if (error instanceof APIFault) {
    return c.json({ success: false, ...formattedError }, error.statusCode);
  } else {
    return c.json({ success: false, error: error.message }, 500);
  }
}

export enum ERROR_CODE {
  VAILDATION,
}
