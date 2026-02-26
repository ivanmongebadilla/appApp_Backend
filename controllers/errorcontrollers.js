export const errorHandler = (err, req, res, next) =>{
  err.statusCode = err.statusCode || 500; // If there is no statusCode then default will be 500
  err.status = err.status || 'error' // If there is no status then default will be error
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}