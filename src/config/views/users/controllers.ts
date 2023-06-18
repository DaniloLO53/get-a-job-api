import { Request, Response } from "express";
import { createUser, signInUser } from "./services";

export async function signIn(
  request: Request,
  response: Response
) {
  const { email, password } = request.body;

  try {
    const token = await signInUser({ email, password })

    return response.status(201).send({ token });
  } catch (error) {
    console.log('Error', console.log(error))
    return response.send(error);
  }
}

export async function signUp(
  request: Request,
  response: Response
) {
  const { email, password, confirmPassword } = request.body;
  const passwords = { password, confirmPassword };

  try {
    await createUser({ email, passwords });

    return response.sendStatus(201);
  } catch (error) {
    console.log('Error', console.log(error))
    return response.send(error);
  }
}