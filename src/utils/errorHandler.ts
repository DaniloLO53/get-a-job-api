import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type ApplicationError = {
  name: string;
  message: string;
  code: number;
};

export async function errorHandler(
  error: ApplicationError | Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log('Error handler...')
  console.log('Error hadnler', error)
  console.log('Error name', error.name)
  if ("code" in error) {
    return response.status(error.code).send({
      message: error.message,
      code: error.code,
    });
  }
  return response.status(500).send({
    message: error.message,
  }); 
}