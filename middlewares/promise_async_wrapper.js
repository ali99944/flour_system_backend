import CustomError from "../interfaces/custom_error_class.js";
import { INTERNAL_SERVER } from "../constants/status_codes.js";

const promiseAsyncWrapper = (fn) =>{
    return async (resolve, reject) =>{
        try{
            await fn(resolve,reject);
        }catch(error){            
            
            let custom_error = new CustomError(error.message, INTERNAL_SERVER)
            return reject(custom_error);
        }
    }
}

export default promiseAsyncWrapper