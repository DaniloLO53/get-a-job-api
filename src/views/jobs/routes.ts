import { Router } from "express";
import { listJobs } from "./controllers";

const jobsRoute = Router();

jobsRoute.get('/jobs', listJobs);

export default jobsRoute;
