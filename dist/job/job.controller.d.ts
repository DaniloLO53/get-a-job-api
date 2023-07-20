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
        location_job: import(".prisma/client").LocationJob[];
        worker: import(".prisma/client").Worker;
    }>;
    listServices(queries: any): Promise<(import(".prisma/client").Job & {
        location_job: import(".prisma/client").LocationJob[];
        worker: import(".prisma/client").Worker;
    })[]>;
    searchJobs(queries: any): Promise<import(".prisma/client").Job[]>;
    searchJobsPagination(queries: any, direction: Direction): Promise<import(".prisma/client").Job[]>;
}
