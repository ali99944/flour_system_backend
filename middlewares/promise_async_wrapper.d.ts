import { CustomError } from '../interfaces/custom_error_class';

/**
 * Represents a function that wraps an asynchronous function returning a promise.
 * @type {function}
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Promise} - A promise that resolves or rejects based on the result of the wrapped function.
 */
declare type PromiseAsyncWrapperFunction = (
  fn: (resolve: (value?: T) => void, reject: (reason?: CustomError) => void) => Promise<void>,
) => (resolve: (value?: T) => void, reject: (reason?: CustomError) => void) => void;

/**
 * Wraps an asynchronous function returning a promise, handling errors and rejecting with a CustomError.
 * @type {PromiseAsyncWrapperFunction}
 */
declare const promiseAsyncWrapper: PromiseAsyncWrapperFunction;

export default promiseAsyncWrapper;
