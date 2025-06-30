interface IApiError extends Error {
  statusCode?: number;
  details?: Record<string, unknown>;
}

/**
 * Custom error class for API errors.
 * Extends the built-in Error class to include status code and details.
 */
export class ApiError extends Error implements IApiError {
  statusCode?: number;
  details?: Record<string, unknown>;

  constructor(message: string, statusCode = 500, details: Record<string, unknown> = {}) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
