import { WorkerProfile } from "./worker.interface";

export function filterJobField(jobs: any[]) {
  return jobs.map((job) => ({
    title: job.title,
    description: job.description,
    min_price: job.min_price,
    max_price: job.max_price,
    schedules: filterScheduleField(job.schedules),
    location_job: filterLocationJobField(job.location_job)
  }))
}

export function filterScheduleField(schedules: any[]) {
  return schedules.map((schedule) => ({
    day: schedule.day,
    day_hour_start: schedule.day_hour_start,
    day_hour_end: schedule.day_hour_end,
  }))
}

export function filterLocationJobField(locations: any[]) {
  return locations.map((location) => ({
    state: location.state,
    city: location.city,
    region: location.region,
  }))
}

export function filterWorkerField(worker: WorkerProfile) {
  const { first_name, last_name, nickname, email, jobs, rates } = worker;
  

  return {
    first_name,
    last_name,
    nickname,
    email,
    jobs: filterJobField(jobs),
    rates
  }
}