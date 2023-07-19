import { WorkerProfile } from "./worker.interface";
export declare function filterJobField(jobs: any[]): {
    title: any;
    description: any;
    min_price: any;
    max_price: any;
    schedules: {
        day: any;
        day_hour_start: any;
        day_hour_end: any;
    }[];
    location_job: {
        state: any;
        city: any;
        region: any;
    }[];
}[];
export declare function filterScheduleField(schedules: any[]): {
    day: any;
    day_hour_start: any;
    day_hour_end: any;
}[];
export declare function filterLocationJobField(locations: any[]): {
    state: any;
    city: any;
    region: any;
}[];
export declare function filterWorkerField(worker: WorkerProfile): {
    first_name: string;
    last_name: string;
    nickname: string;
    email: string;
    jobs: {
        title: any;
        description: any;
        min_price: any;
        max_price: any;
        schedules: {
            day: any;
            day_hour_start: any;
            day_hour_end: any;
        }[];
        location_job: {
            state: any;
            city: any;
            region: any;
        }[];
    }[];
    rates: import(".prisma/client").Rate[];
};
