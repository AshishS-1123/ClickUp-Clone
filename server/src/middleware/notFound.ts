import { Request, Response, NextFunction } from "express";

const notFound = (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(200).end("404 | Not Found");
}

export default notFound;
