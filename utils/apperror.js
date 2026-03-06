export class AppError extends Error{ //Extendes built-in Error class
    constructor(message, statusCode) {
        super(message) //This is to call parent constructor in this case from Error which it onlys required the message
        
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor);
    }
} 