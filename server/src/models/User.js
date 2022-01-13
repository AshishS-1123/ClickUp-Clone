const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

// The schema for database table
const UserSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: [true, "Please provide a email."],
    unique: true,
    sparse: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please provide a valid email."
    ],
    trim: true,
    index: {
      unique: true,
      partialFilterExpression: { email: { $type: "string" } }
    }
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: 6,
    select: false // If we query a user we dont want their password unless we ask for it explicitly
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  // For storing the Workspaces of the user.
  workspaces: {
    type: [String],
    default: [],
  }
})

// pre('save') will run our callback function before every save operation to database
// the callback has to be made using function keyword
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // if password did not change, move to next middleware
    next()
  }

  // salt creates random hash
  const salt = await bcrypt.genSalt(10)
  // hash the password and update it
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// We are attaching this method to our user object and using it to compare passwords
// during authentication. Using bcrypt because the passwords are encrypted
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// This generates a JWT for user using json web token library
UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

// Generate a reset token using crypto
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

  return resetToken
}

const User = mongoose.model('User', UserSchema)

module.exports = User
