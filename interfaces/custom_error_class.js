class CustomError extends Error {
    message;
    status;

    constructor(message, status){
        super(message)
        this.status = status
        this.message = message
    }
}


export default CustomError