const ErrorResponse = require ('../utils/errorResponse')

const errorHandler = (error, req, res, next) => {
  let err = {...error}

  err.message = error.message

  if (err.code === 11000) {
    const message = "Duplicate field value"
    error = new ErrorResponse (message, 400)
  }

  if (err.name === "ValidationError") {
    const message = Object.values (err.errors).map (val => val.message)
    error = new ErrorResponse (message, 400)
  }

  res.status (err.statusCode || 500).json ({
    success: false,
    error: error.message || "Server error."
  })
}

module.exports = errorHandler
