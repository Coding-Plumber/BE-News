
function handle400Errors(err, req, res, next) {
  if (err.statusCode === 400) {
    res.status(400).json({
      error: {
        message: err.message,
      },
    });
  } else {
    next(err);
  }
}

function handle404Errors(err, req, res, next) {
  if (err.statusCode === 404) {
    res.status(404).json({
      error: {
        message: err.message,
      },
    });
  } else {
    next(err);
  }
}

function handle500Errors(err, req, res, next) {
  res.status(500).json({
    error: {
      message: "Internal server error",
    },
  });
}

function errorHandler(err, req, res, next) {
  console.log(err);
  next(err);
}

  module.exports = { handle400Errors, handle404Errors, handle500Errors,errorHandler};