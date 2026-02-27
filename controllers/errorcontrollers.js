const sendErrorDev = (err, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    } else {
        console.error('❌❌ERROR❌❌', err)
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        })
    }
    
}

const sendErrorProd = (err, res) => {
    if (err.isOperational){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    } else {
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
    
}

export const errorHandler = (err, req, res, next) =>{
  err.statusCode = err.statusCode || 500; // If there is no statusCode then default will be 500
  err.status = err.status || 'error' // If there is no status then default will be error
  
  if(process.env.NODE_ENV === 'development'){
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production'){
    sendErrorProd(err, res);
  }
  
}