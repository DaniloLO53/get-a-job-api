import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { unauthorized } from "./errors";

export async function auth(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { Authentication} = request.headers;
  const [_, token] = (Authentication as string).split(" ");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string);
    if (user) throw unauthorized();

    response.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
}