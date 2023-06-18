import { Request, Response } from "express";
import { getGoogleOAuthTokens, getGoogleUser } from "./services";
import jwt from 'jsonwebtoken';
import { createUser, signInUser } from "../users/services";
import dotenv from 'dotenv';
import { insertSession } from "./repositories";

dotenv.config();

export async function googleOauthHandler(
  request: Request,
  response: Response
) {
  const code = request.query.code as string;

  try {
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    // const googleUser = jwt.decode(id_token);
    const googleUser = await getGoogleUser({ id_token, access_token });

    const dbUser = await createUser({ email: googleUser.email });

    const session = await insertSession(dbUser.id);

    const accessToken = jwt.sign(
      { dbUser, session: session.id },
      process.env.JWT_SECRET as string
    );
    response.cookie("accessToken", accessToken);

    return response.redirect(process.env.ORIGIN as string);
  } catch (error) {
    console.log('Error')
    console.log(error)

    return response.send(error)
  }
  
}