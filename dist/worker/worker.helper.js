"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterWorkerField = exports.filterLocationJobField = exports.filterScheduleField = exports.filterJobField = void 0;
function filterJobField(jobs) {
    return jobs.map((job) => ({
        title: job.title,
        description: job.description,
        min_price: job.min_price,
        max_price: job.max_price,
        schedules: filterScheduleField(job.schedules),
        location_job: filterLocationJobField(job.location_job)
    }));
}
exports.filterJobField = filterJobField;
function filterScheduleField(schedules) {
    return schedules.map((schedule) => ({
        day: schedule.day,
        day_hour_start: schedule.day_hour_start,
        day_hour_end: schedule.day_hour_end,
    }));
}
exports.filterScheduleField = filterScheduleField;
function filterLocationJobField(locations) {
    return locations.map((location) => ({
        state: location.state,
        city: location.city,
        region: location.region,
    }));
}
exports.filterLocationJobField = filterLocationJobField;
function filterWorkerField(worker) {
    const { first_name, last_name, nickname, email, jobs, rates } = worker;
    return {
        first_name,
        last_name,
        nickname,
        email,
        jobs: filterJobField(jobs),
        rates
    };
}
exports.filterWorkerField = filterWorkerField;
//# sourceMappingURL=worker.helper.js.map