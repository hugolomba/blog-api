function errorHandler(err, req, res, next) {
  console.error(err.stack);


  console.error(err.stack);


  const status = err.status || 500;

  let message = err.message || "Internal Server Error";
  let code = err.code || "INTERNAL_ERROR";

  res.status(status).json({
    success: false,
    data: null,
    message,
    error: { code },
  });
}

export default errorHandler;