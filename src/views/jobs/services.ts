import { findJobs, findJobsWithQueries } from "./repositories";

export async function getJobs() {
  const jobs = await findJobs();

  return jobs;
}
export async function getJobsWithQuery(queries: any) {
  const jobs = await findJobsWithQueries(queries);

  return jobs;
}