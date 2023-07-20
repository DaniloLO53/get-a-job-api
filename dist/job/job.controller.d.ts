import { ScheduleDto } from './job.dto';
import { Direction } from './job.interface';
import { JobService } from './job.service';
export declare class JobController {
    private readonly jobService;
    private lastJobInResults;
    private firstJobInResults;
    constructor(jobService: JobService);
    deleteSchedule(params: {
        id: string;
        idSchedule: string;
    }): Promise<import(".prisma/client").Schedule>;
    createSchedule(queries: ScheduleDto, id: string): Promise<import(".prisma/client").Schedule>;
    getSchedules(id: string): Promise<import(".prisma/client").Schedule[]>;
    getJob(id: string): Promise<import(".prisma/client").Job & {
        worker: import(".prisma/client").Worker;
        location_job: import(".prisma/client").LocationJob[];
    }>;
    listJobs(queries: any): Promise<(import(".prisma/client").Job & {
        worker: import(".prisma/client").Worker;
        location_job: import(".prisma/client").LocationJob[];
    })[]>;
    searchJobs(queries: any): Promise<import(".prisma/client").Job[]>;
    searchJobsPagination(queries: any, direction: Direction): Promise<import(".prisma/client").Job[]>;
}
