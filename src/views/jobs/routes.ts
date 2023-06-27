import { Router } from "express";
import { listJobs, listJobsWithQuery } from "./controllers";

const jobsRoute = Router();

jobsRoute.get('/jobs', listJobs);
jobsRoute.get('/jobs/search', listJobsWithQuery);

export default jobsRoute;
