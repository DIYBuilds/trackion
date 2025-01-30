export const pageViewSchema: string = `{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL of the page"
    },
    "referrer": {
      "type": "string",
      "description": "The URL of the referrer"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "The timestamp of the event"
    },
    "user_agent": {
      "type": "string",
      "description": "The user agent of the browser"
    },
    "screen_width": {
      "type": "number",
      "description": "The width of the screen"
    },
    "screen_height": {
      "type": "number",
      "description": "The height of the screen"
    },
    "ip": {
      "type": "string",
      "description": "The IP address of the user"
    },
    "session_id": {
      "type": "string",
      "description": "The session ID of the user"
    },
    device: {
      type: "object",
      properties: {
        type: {
          type: "string",
          description: "The type of device"
        },
        vendor: {
          type: "string",
          description: "The vendor of the device"
        },
        model: {
          type: "string",
          description: "The model of the device"
        }
      }
    },
  }
}`;

export const pageLeaveSchema: string = `{
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL of the page"
    },
    "referrer": {
      "type": "string",
      "description": "The URL of the referrer"
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "The timestamp of the event"
    },
    "time_spent": {
      "type": "number",
      "description": "The time spent on the page"
    },
    "ip": {
      "type": "string",
      "description": "The IP address of the user"
    },
    "session_id": {
      "type": "string",
      "description": "The session ID of the user"
    },
    "user_agent": {
      "type": "string",
      "description": "The user agent of the browser"
    },
    "screen_width": {
      "type": "number",
      "description": "The width of the screen"
    },
    "screen_height": {
      "type": "number",
      "description": "The height of the screen"
    },
    device: {
      type: "object",
      properties: {
        type: {
          type: "string",
          description: "The type of device"
        },
        vendor: {
          type: "string",
          description: "The vendor of the device"
        },
        model: {
          type: "string",
          description: "The model of the device"
        }
      }
    },
  }
}`;
