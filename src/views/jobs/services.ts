import { findJobs } from "./repositories";

export async function getJobs() {
  const jobs = await findJobs();

  return jobs;
}
