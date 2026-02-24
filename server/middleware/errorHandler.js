export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    error.message = 'Invalid input data';
    error.status = 400;
  }

  if (err.code === 'ECONNREFUSED') {
    error.message = 'External service unavailable';
    error.status = 503;
  }

  if (err.response?.status === 429) {
    error.message = 'Rate limit exceeded';
    error.status = 429;
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && error.status === 500) {
    error.message = 'Internal Server Error';
  }

  res.status(error.status).json({
    error: error.message,
    timestamp: new Date().toISOString(),
    path: req.path
  });
};
