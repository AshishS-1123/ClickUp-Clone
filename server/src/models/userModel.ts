import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

interface User {
  userEmail: string,
  userPassword: string,
  resetPasswordToken?: string,
  resetPasswordExpire?: string,
  workspaces: string[],
}

// Schema for user
const UserSchema = new mongoose.Schema<User>({
  userEmail: {
    type: String,
    required: [true, "Please provide an email."],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please provide a valid email."
    ],
  },
  userPassword: {
    type: String,
    required: [true, "Please provide a password."],
    minLength: 6,
    select: false, // We dont want to return the password unless specifically asked for it.
  },
  resetPasswordToken: String, // Used when resetting password of user.
  resetPasswordExpire: Date, // Time limit for resetting passsword.

  // The rest of these values are for storing the heirarchical data.
  workspaces: {
    type: [String],
    select: false, // We may not want to get the users workspaces when authenticating.
    default: [],
  },
})

// Everytime we save the user, we want to encrypt the password if it was changed.
UserSchema.pre("save", async function (next) {
  // If the password did not change, dont do anything.
  if (!this.isModified("userPassword")) {
    next();
  }

  // Generate a random salt.
  const salt = await bcrypt.genSalt(10);
  // Encrypt the password.
  this.password = await bcrypt.hash(this.password, salt);
  next();
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

const User = mongoose.model<User>('User', UserSchema)
