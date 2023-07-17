import { Direction } from './job.interface';
import { JobService } from './job.service';
export declare class JobController {
    private readonly jobService;
    private lastJobInResults;
    private firstJobInResults;
    constructor(jobService: JobService);
    listJobs(queries: any): Promise<any>;
    searchJobs(queries: any): Promise<any>;
    searchJobsPagination(queries: any, direction: Direction): Promise<any>;
}
