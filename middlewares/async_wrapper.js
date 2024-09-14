import CustomError from "../interfaces/custom_error_class.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";
import logger from '../utils/logger.js'

const asyncWrapper = (fn) =>{
    return async (req, res, next) =>{
        try{
            await fn(req,res,next);
        }catch(error){            
            logger.error(error.message)
            if(error instanceof CustomError){
                return next(error);
            }

            let custom_error = new CustomError(error.message, INTERNAL_SERVER)
            return next(custom_error);
        }
    }
}

export default asyncWrapper