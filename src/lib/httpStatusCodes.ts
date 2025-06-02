// src/lib/httpStatusCodes.ts

export type HttpStatusCode = {
  code: number;
  title: string;
  defaultMessage: string;
};

export const HTTP_STATUS = {
  OK: { code: 200, title: "OK", defaultMessage: "Request succeeded." },

  CREATED: {
    code: 201,
    title: "Created",
    defaultMessage: "Resource created successfully.",
  },

  BAD_REQUEST: {
    code: 400,
    title: "Bad Request",
    defaultMessage:
      "The request could not be understood or was missing required parameters.",
  },

  UNAUTHORIZED: {
    code: 401,
    title: "Unauthorized",
    defaultMessage: "Authentication failed or user does not have permissions.",
  },

  FORBIDDEN: {
    code: 403,
    title: "Forbidden",
    defaultMessage: "Access is forbidden to the requested resource.",
  },

  NOT_FOUND: {
    code: 404,
    title: "Not Found",
    defaultMessage: "The requested resource could not be found.",
  },

  CONFLICT: {
    code: 409,
    title: "Conflict",
    defaultMessage:
      "A conflict occurred with the current state of the resource.",
  },

  TOO_MANY_REQUESTS: {
    code: 429,
    title: "Too Many Requests",
    defaultMessage:
      "You have sent too many requests in a given amount of time.",
  },

  INTERNAL_SERVER_ERROR: {
    code: 500,
    title: "Internal Server Error",
    defaultMessage: "An error occurred on the server.",
  },

  SERVICE_UNAVAILABLE: {
    code: 503,
    title: "Service Unavailable",
    defaultMessage: "The server is currently unavailable.",
  },
};
