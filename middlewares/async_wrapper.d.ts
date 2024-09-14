import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/custom_error_class';
import { INTERNAL_SERVER } from '../constants/status_codes';

declare type AsyncWrapperFunction = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => (req: Request, res: Response, next: NextFunction) => Promise<void>;

declare const asyncWrapper: AsyncWrapperFunction;

export default asyncWrapper;