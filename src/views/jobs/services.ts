import { findJobs, findJobsWithQueries, findJobsWithQueriesOffset } from "./repositories";

export async function getJobs() {
  const jobs = await findJobs();

  return jobs;
}
export async function getJobsWithQuery(queries: any) {
  const jobs = await findJobsWithQueries(queries);

  return jobs;
}

export async function getJobsWithQueryOffset(queries: any) {
  const jobs = await findJobsWithQueriesOffset(queries);

  return jobs;
}