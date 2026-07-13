/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Error handling utilities for BNS AI application
 */

export interface ErrorNotification {
  type: 'error' | 'warning' | 'info' | 'success';
  message: string;
  details?: string;
  code?: string;
  timestamp?: Date;
}

export class BNSAIError extends Error {
  code: string;
  details?: string;
  timestamp: Date;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', details?: string) {
    super(message);
    this.name = 'BNSAIError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

/**
 * Error codes for different error scenarios
 */
export const ERROR_CODES = {
  // Validation errors
  INVALID_INPUT: 'INVALID_INPUT',
  INVALID_EMAIL: 'INVALID_EMAIL',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  INVALID_QUERY: 'INVALID_QUERY',

  // Authentication errors
  AUTH_FAILED: 'AUTH_FAILED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',

  // API errors
  API_ERROR: 'API_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',

  // Voice errors
  VOICE_NOT_SUPPORTED: 'VOICE_NOT_SUPPORTED',
  MICROPHONE_ERROR: 'MICROPHONE_ERROR',
  SPEECH_RECOGNITION_ERROR: 'SPEECH_RECOGNITION_ERROR',

  // Data errors
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  DATA_PERSISTENCE_ERROR: 'DATA_PERSISTENCE_ERROR',

  // Server errors
  SERVER_ERROR: 'SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',

  // Unknown errors
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
};

/**
 * User-friendly error messages
 */
const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.INVALID_INPUT]: 'Please check your input and try again.',
  [ERROR_CODES.INVALID_EMAIL]: 'Please enter a valid email address.',
  [ERROR_CODES.INVALID_PASSWORD]: 'Password must be at least 8 characters with uppercase, lowercase, and numbers.',
  [ERROR_CODES.INVALID_QUERY]: 'Please enter a valid legal query.',
  [ERROR_CODES.AUTH_FAILED]: 'Authentication failed. Please try again.',
  [ERROR_CODES.UNAUTHORIZED]: 'You are not authorized to perform this action.',
  [ERROR_CODES.SESSION_EXPIRED]: 'Your session has expired. Please log in again.',
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Invalid email or password.',
  [ERROR_CODES.API_ERROR]: 'An error occurred while processing your request.',
  [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  [ERROR_CODES.RATE_LIMIT_ERROR]: 'Too many requests. Please wait a moment and try again.',
  [ERROR_CODES.VOICE_NOT_SUPPORTED]: 'Voice mode is not supported in your browser.',
  [ERROR_CODES.MICROPHONE_ERROR]: 'Unable to access microphone. Please check permissions.',
  [ERROR_CODES.SPEECH_RECOGNITION_ERROR]: 'Speech recognition failed. Please try again.',
  [ERROR_CODES.DATA_NOT_FOUND]: 'The requested data was not found.',
  [ERROR_CODES.DATA_PERSISTENCE_ERROR]: 'Failed to save data. Please try again.',
  [ERROR_CODES.SERVER_ERROR]: 'Server error. Please try again later.',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service is temporarily unavailable. Please try again later.',
  [ERROR_CODES.UNKNOWN_ERROR]: 'An unexpected error occurred. Please try again.',
};

/**
 * Converts an error to a user-friendly notification
 * @param error - The error to convert
 * @returns Error notification
 */
export const errorToNotification = (error: unknown): ErrorNotification => {
  let message = 'An unexpected error occurred';
  let code = ERROR_CODES.UNKNOWN_ERROR;
  let details: string | undefined;

  if (error instanceof BNSAIError) {
    code = error.code;
    message = ERROR_MESSAGES[code] || error.message;
    details = error.details;
  } else if (error instanceof Error) {
    message = error.message;
    details = error.stack;
  } else if (typeof error === 'string') {
    message = error;
  }

  return {
    type: 'error',
    message,
    code,
    details,
    timestamp: new Date(),
  };
};

/**
 * Handles API errors and converts them to BNSAIError
 * @param error - The API error
 * @param context - Context for the error
 * @returns BNSAIError
 */
export const handleAPIError = (error: unknown, context: string): BNSAIError => {
  let code = ERROR_CODES.API_ERROR;
  let message = 'An API error occurred';
  let details: string | undefined;

  if (error instanceof Response) {
    switch (error.status) {
      case 400:
        code = ERROR_CODES.INVALID_INPUT;
        message = 'Invalid request';
        break;
      case 401:
        code = ERROR_CODES.UNAUTHORIZED;
        message = 'Unauthorized access';
        break;
      case 403:
        code = ERROR_CODES.UNAUTHORIZED;
        message = 'Access forbidden';
        break;
      case 404:
        code = ERROR_CODES.DATA_NOT_FOUND;
        message = 'Resource not found';
        break;
      case 429:
        code = ERROR_CODES.RATE_LIMIT_ERROR;
        message = 'Rate limit exceeded';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        code = ERROR_CODES.SERVER_ERROR;
        message = 'Server error';
        break;
      default:
        message = `HTTP ${error.status}`;
    }
    details = error.statusText;
  } else if (error instanceof TypeError) {
    if (error.message.includes('fetch')) {
      code = ERROR_CODES.NETWORK_ERROR;
      message = 'Network connection error';
    }
  } else if (error instanceof Error) {
    message = error.message;
    details = error.stack;
  }

  return new BNSAIError(`${context}: ${message}`, code, details);
};

/**
 * Handles validation errors
 * @param error - The validation error
 * @param fieldName - The field that failed validation
 * @returns BNSAIError
 */
export const handleValidationError = (error: string, fieldName: string): BNSAIError => {
  return new BNSAIError(
    error,
    ERROR_CODES.INVALID_INPUT,
    `Validation failed for field: ${fieldName}`
  );
};

/**
 * Handles voice-related errors
 * @param error - The voice error
 * @returns BNSAIError
 */
export const handleVoiceError = (error: unknown): BNSAIError => {
  let code = ERROR_CODES.SPEECH_RECOGNITION_ERROR;
  let message = 'Speech recognition failed';

  if (error instanceof Error) {
    if (error.message.includes('not-allowed')) {
      code = ERROR_CODES.MICROPHONE_ERROR;
      message = 'Microphone access denied';
    } else if (error.message.includes('no-speech')) {
      message = 'No speech detected';
    } else if (error.message.includes('network')) {
      code = ERROR_CODES.NETWORK_ERROR;
      message = 'Network error during speech recognition';
    }
  }

  return new BNSAIError(message, code, error instanceof Error ? error.message : String(error));
};

/**
 * Logs an error for debugging
 * @param error - The error to log
 * @param context - Context for the error
 */
export const logError = (error: unknown, context: string): void => {
  const timestamp = new Date().toISOString();
  const errorInfo = error instanceof Error ? error.message : String(error);

  console.error(`[${timestamp}] [${context}]`, errorInfo);

  // In production, you might want to send this to a logging service
  if (process.env.NODE_ENV === 'production') {
    // Example: sendToLoggingService({ timestamp, context, error: errorInfo });
  }
};

/**
 * Retries a function with exponential backoff
 * @param fn - The function to retry
 * @param maxRetries - Maximum number of retries
 * @param delay - Initial delay in milliseconds
 * @returns The result of the function
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (i < maxRetries - 1) {
        const backoffDelay = delay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, backoffDelay));
      }
    }
  }

  throw lastError || new Error('Retry failed');
};

/**
 * Creates a timeout promise
 * @param ms - Timeout in milliseconds
 * @returns Promise that rejects after timeout
 */
export const createTimeout = (ms: number): Promise<never> => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new BNSAIError('Request timeout', ERROR_CODES.TIMEOUT_ERROR)), ms)
  );
};

/**
 * Executes a function with a timeout
 * @param fn - The function to execute
 * @param timeoutMs - Timeout in milliseconds
 * @returns The result of the function
 */
export const executeWithTimeout = async <T>(
  fn: () => Promise<T>,
  timeoutMs: number = 30000
): Promise<T> => {
  return Promise.race([fn(), createTimeout(timeoutMs)]);
};
