import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB } from '@/config';

import sessionRoute from './views/sessions/routes'
import userRoute from './views/users/routes';
import { errorHandler } from './utils/errorHandler';
import jobsRoute from './views/jobs/routes';

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('', sessionRoute)
  .use('', userRoute)
  .use('', jobsRoute)
  .use(errorHandler)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;