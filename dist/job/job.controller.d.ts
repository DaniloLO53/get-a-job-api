import { DeleteAgreementDto, DeleteScheduleDto, ScheduleDto } from './job.dto';
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
    createSchedule(scheduleData: ScheduleDto, request: any, jobId: string): Promise<import(".prisma/client").Schedule>;
    getSchedules(jobId: string): Promise<import(".prisma/client").Schedule[]>;
    deleteSchedule(params: DeleteScheduleDto, request: any): Promise<import(".prisma/client").Schedule>;
    deleteAgreement(params: DeleteAgreementDto, request: any): Promise<import(".prisma/client").Agreement>;
    createAgreement(params: DeleteScheduleDto, request: any): Promise<import(".prisma/client").Agreement>;
    getAgreement(params: DeleteScheduleDto, request: any): Promise<import(".prisma/client").Agreement>;
    listJobs(queries: any): Promise<(import(".prisma/client").Job & {
        worker: import(".prisma/client").Worker;
        location_job: import(".prisma/client").LocationJob[];
    })[]>;
    listJobsMore(queries: any): Promise<import(".prisma/client").Job[]>;
}
