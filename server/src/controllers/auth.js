const User = require('../models/User')
const Workspace = require("../models/Workspace")
const WorkspaceMeta = require('../models/WorkspaceMeta');
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const { createNewWorkspace } = require('./private/workspace')

exports.registerUser = async (req, res, next) => {
  // Get the login info from the request
  const { userEmail, password } = req.body

  try {
    // Create a new user in the database.
    // No need to perform hashing. Will be done using middleware
    const user = await User.create({
      userEmail, password
    })

    try {
      const workspace = await Workspace.create({
        name: "Default Workspace",
        userId: user._id,
      });

      await WorkspaceMeta.create({ userId: user._id, workspaceId: workspace._id });

      // Add the new workspace's id to this user.
      user.workspaces.push(workspace._id);
      // Write to database.
      await user.save();
    } catch (error) {
      console.log(error.message);
      return next(new ErrorResponse("Could not create default workspace for user", 400));
    }

    // If everything was done properly, send success to user
    sendToken(user, 201, res)

  } catch (error) {
    let message = "";
    if (error.message.search("E11000") !== -1) {
      message = "Email already exists";
    } else {
      message = "Server Error";
    }

    // In case of error, inform user
    return next(new ErrorResponse(message))
  }
}

exports.loginUser = async (req, res, next) => {
  const { userEmail, password } = req.body

  if (!userEmail || !password) {
    return next(new ErrorResponse("Please provide email and password.", 400))
  }

  try {
    const user = await User.findOne({ userEmail }).select('+password')

    if (!user) {
      return next(new ErrorResponse("Invalid Credentials.", 401))
    }

    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials.", 401))
    }

    // If everything was done properly, send success to user
    sendToken(user, 201, res)

  } catch (error) {
    return next(new ErrorResponse(error.message))
  }
}

exports.forgotPassword = async (req, res, next) => {
  const { userEmail } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404))
    }

    const resetToken = user.getResetPasswordToken()

    // save the reset token to the database
    await user.save()

    // This is the url the user must visit to reset their passsword
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`
    // Message we will send the user to reset password using email.
    const message = `
      <h1>You have requested a password request</h1>
      <p>Go to this link to reset password</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset",
        text: message
      })

      res.status(200).json({
        success: true,
        data: "Email Sent!"
      })

    } catch (error) {
      console.log(error);
      // If there was some problem in sending email.
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      return next(new ErrorResponse("Email could not be sent.", 500))
    }
  } catch (error) {
    next(error)
  }
}

exports.resetPassword = async (req, res, next) => {
  const resetToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
      return next(new ErrorResponse("Invalid Reset Token.", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    return res.status(201).json({
      success: true,
      data: "Password Reset Success."
    })
  } catch (error) {
    next(error)
  }
}

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken()
  res.status(statusCode).json({
    success: true,
    token,
    userEmail: user.userEmail,
    userId: user._id,
  })
}
