import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/customError";

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status).json({ message: error.message });
}

export {
  errorHandler,
}
