import { NextFunction, Request, Response } from "express";
import { getJobs } from "./services";
import dotenv from 'dotenv';

dotenv.config();

export async function listJobs(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const jobs = await getJobs();
    return response.status(200).send({ jobs });
  } catch (error) {
    console.log('Error', error)
    next(error)
  }
}
