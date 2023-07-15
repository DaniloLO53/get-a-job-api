import { Direction } from './job.interface';
import { JobService } from './job.service';
export declare class JobController {
    private readonly jobService;
    private lastJobInResults;
    private firstJobInResults;
    constructor(jobService: JobService);
    listJobs(queries: any): Promise<(import(".prisma/client").Job & {
        company: import(".prisma/client").Company;
    })[]>;
    searchJobs(queries: any): Promise<import(".prisma/client").Job[]>;
    searchJobsPagination(queries: any, direction: Direction): Promise<import(".prisma/client").Job[]>;
}
