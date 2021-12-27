import { RequestHandler, Router } from "express";
import { registerUser, loginUser, forgotPassword, resetPassword } from "../controllers/authController";

const authRouter = Router();

const dummyMethod: RequestHandler = (req, res, next) => {
  res.end("In Dummy Method");
}

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/forgotPassword").post(forgotPassword);
authRouter.route("/resetPassword/:resetToken").post(resetPassword);

export default authRouter;
