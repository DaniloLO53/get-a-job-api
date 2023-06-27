import { Router } from "express";
import { listJobs, listJobsWithQuery, listJobsWithQueryOffset } from "./controllers";

const jobsRoute = Router();

jobsRoute.get('/jobs', listJobs);
jobsRoute.get('/jobs/search', listJobsWithQuery);
jobsRoute.get('/jobs/search/more', listJobsWithQueryOffset);

export default jobsRoute;
