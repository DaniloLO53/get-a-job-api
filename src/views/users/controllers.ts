import { NextFunction, Request, Response } from "express";
import { createUser, signInUser } from "./services";
import dotenv from 'dotenv';

dotenv.config();

export async function signIn(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email, password } = request.body;

  try {
    const token = await signInUser({ email, password })

    response.cookie("accessToken", token);

    return response.status(201).send({ token });
  } catch (error) {
    console.log('Error', error)
    next(error)
  }
}

export async function signUp(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email, password, confirmPassword } = request.body;
  const passwords = { password, confirmPassword };

  try {
    await createUser({ email, passwords });

    return response.sendStatus(201);
  } catch (error) {
    console.log('Error at controller', error)
    next(error)
  }
}