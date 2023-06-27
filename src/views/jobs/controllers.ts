import { NextFunction, Request, Response } from "express";
import { getJobs, getJobsWithQuery, getJobsWithQueryOffset } from "./services";
import dotenv from 'dotenv';

dotenv.config();
let lastJobInResults: any;

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

export async function listJobsWithQuery(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { searchQuery } = request.query;
  
  try {
    const jobs = await getJobsWithQuery({ searchQuery });
    lastJobInResults = jobs[6];
    return response.status(200).send({ jobs });
  } catch (error) {
    console.log('Error', error)
    next(error)
  }
}

export async function listJobsWithQueryOffset(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { searchQuery } = request.query;
  const myCursor = lastJobInResults?.id
  
  try {
    const jobs = await getJobsWithQueryOffset({ searchQuery, myCursor });
    lastJobInResults = jobs[6];
    return response.status(200).send({ jobs });
  } catch (error) {
    console.log('Error', error)
    next(error)
  }
}
