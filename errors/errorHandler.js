

function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || "Server error";
    if (err) res.status(500).send({err});
  }

  module.exports = errorHandler;