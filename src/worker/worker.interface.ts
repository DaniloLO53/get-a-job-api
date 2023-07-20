import { Job, LocationJob, Rate, Schedule, Worker } from "@prisma/client";

export type WorkerProfile = Worker & {
  jobs: (Job & {
      schedules: Schedule[];
      location_job: LocationJob[];
  })[];
  rates: Rate[];
}
