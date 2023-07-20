import { JobService } from './job.service';
export declare class JobController {
    private readonly jobService;
    private lastJobInResults;
    constructor(jobService: JobService);
    createJob(jobData: any, request: any): Promise<import(".prisma/client").Job>;
    updateJob(jobData: any, request: any, jobId: string): Promise<import(".prisma/client").Job>;
    getJob(jobId: string): Promise<import(".prisma/client").Job & {
        worker: import(".prisma/client").Worker;
        location_job: import(".prisma/client").LocationJob[];
    }>;
    listJobs(queries: any): Promise<(import(".prisma/client").Job & {
        worker: import(".prisma/client").Worker;
        location_job: import(".prisma/client").LocationJob[];
    })[]>;
    listJobsMore(queries: any): Promise<import(".prisma/client").Job[]>;
}
