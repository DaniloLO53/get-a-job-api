import { findUser, insertUser } from "./repositories";
import { insertSession } from "../sessions/repositories";
import bycript from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { duplicatedEmailError } from "./errors";

dotenv.config();

interface Passwords {
  password: string;
  confirmPassword: string;
}

interface UserCreate {
  email: string;
  passwords?: Passwords;
}

interface UserSignIn {
  email: string;
  password: string
}

interface AnyObject {
  [key: string]: any;
}

function removeKeyFromObject<T extends AnyObject>(obj: T, key: keyof T): Omit<T, typeof key> {
  const { [key]: _, ...rest } = obj;
  return rest;
}


export async function createUser({
  email,
  passwords,
}: UserCreate) {
  const userAlreadyRegistered = await findUser(email);

  if (userAlreadyRegistered && passwords) throw duplicatedEmailError();

  let hashedPassword;
  if (passwords) {
    const { password, confirmPassword } = passwords
    if (password !== confirmPassword) throw new Error('Passwords must match');

    hashedPassword = await bycript.hash(password, 12);
  } else if(userAlreadyRegistered) return userAlreadyRegistered

  return await insertUser(email, hashedPassword || null)
}

export async function signInUser({
  email,
  password,
}: UserSignIn) {
  const dbUser = await findUser(email);
  if (!dbUser) throw new Error('No user registered');

  if (!dbUser.password) throw new Error('User registered with oauth');

  const validatePassword =  bycript.compare(password, dbUser.password)
  if (!validatePassword) throw new Error('Invalid credentials');

  const session = await insertSession(dbUser.id);

  const dbUserWithoutPassword = removeKeyFromObject(dbUser, 'password');

  return jwt.sign(
    { dbUserWithoutPassword, session: session.id },
    process.env.JWT_SECRET as string
  );
}
