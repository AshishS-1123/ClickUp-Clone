const jwt = require ('jsonwebtoken')
const User = require ('../models/User')
const ErrorResponse = require ('../utils/errorResponse')

exports.protect = async (req, res, next) => {
  let token;

  // Authenticated users will share the token in the Header as "Bearer {token}"
  // We check if the token is present in the request.
  if (req.headers.authorization && req.headers.authorization.startsWith ("Bearer")) {
    token = req.headers.authorization.split (" ")[1]
  }

  // If no token is present, the user is not authorised.
  if (!token) {
    return next (new ErrorResponse ("Not authorized to access this route", 401))
  }

  try {
    // Decrypt the token.
    const decoded = jwt.verify (token, process.env.JWT_SECRET)

    // Check if the token belongs to some user and is not some random string.
    const user = await User.findById (decoded.id)

    if (!user) {
      return next (new ErrorResponse ("No User found with this id.", 404))
    }

    req.user = user
    next ()
  } catch (error) {
    return next (new ErrorResponse ("Not authorized to access this route", 401))
  }
}
