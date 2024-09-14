import CustomError from "../interfaces/custom_error_class.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";
import logger from "../utils/logger.js";

const uiAsyncWrapper = (fn) =>{
    return async (req, res) =>{
        try{
            await fn(req,res);
        }catch(error){            
            logger.error(error.message)
            if(error instanceof CustomError){
                return next(error);
            }

            return res.status(INTERNAL_SERVER).json({
                error: error.message
            })
        }
    }
}

export default uiAsyncWrapper