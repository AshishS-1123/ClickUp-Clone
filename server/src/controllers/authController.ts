import { RequestHandler } from "express";
import { createUserWithPassword, UserDataType } from "../models/accessors/userModel";

const registerUser: RequestHandler = (req, res, next) => {
  const { userId, userEmail, password } = req.body;

  res.end("Register User ...");
}

const loginUser: RequestHandler = (req, res, next) => {
  const { userEmail, password } = req.body;
  console.log(userEmail, password);

  res.end("Login User ...");
}

const forgotPassword: RequestHandler = (req, res, next) => {
  const { userEmail } = req.body;
  console.log(userEmail);

  res.end("Forgot Password ...");
}

const resetPassword: RequestHandler = (req, res, next) => {
  res.end("Reset Password ...");
}

export {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
}
