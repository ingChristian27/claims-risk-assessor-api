/**
 * Generic Result type for handling success and error states
 * If data exists, the operation was successful
 * If error exists, the operation failed
 */
export type Result<T, E = Error> = {
  data?: T;
  error?: E;
};
