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
  if (error.message === 'There is already an user with given email') {
    return response.status(409).send({
      message: error.message,
    });
  }
}