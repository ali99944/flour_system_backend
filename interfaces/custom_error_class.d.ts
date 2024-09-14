/**
 * Represents a custom error with a message and status code.
 * @class CustomError
 * @extends Error
 */
declare class CustomError extends Error {
    message: string;
    status: number;
  
    /**
     * Creates an instance of CustomError.
     * @param {string} message - The error message.
     * @param {number} status - The HTTP status code.
     */
    constructor(message: string, status: number);
  }
  
  export default CustomError;
  