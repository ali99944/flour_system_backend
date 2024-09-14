import { Request, Response } from 'express';
import { CustomError } from '../interfaces/custom_error_class';

/**
 * Represents a function that wraps an asynchronous function for UI rendering.
 * @type {function}
 * @template TReq - The type of the Express request object.
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Promise} - A promise that resolves or rejects based on the result of the wrapped function.
 */
declare type UIAsyncWrapperFunction<TReq extends Request = Request> = (
  fn: (req: TReq, res: Response) => Promise<void>
) => (req: TReq, res: Response) => Promise<void>;

/**
 * Wraps an asynchronous function for UI rendering, handling errors and rendering a 500 page.
 * @type {UIAsyncWrapperFunction}
 */
declare const uiAsyncWrapper: UIAsyncWrapperFunction;

export default uiAsyncWrapper;
