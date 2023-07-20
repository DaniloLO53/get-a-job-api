import { PrismaService } from 'src/prisma.service';
import { DeleteScheduleDto, ScheduleDto } from './job.dto';
export declare class JobService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    deleteSchedule(params: DeleteScheduleDto, workerId: number): Promise<import(".prisma/client").Schedule>;
    getSchedules(id: string): Promise<import(".prisma/client").Schedule[]>;
    createSchedule(scheduleData: ScheduleDto, workerId: number, jobId: string): Promise<import(".prisma/client").Schedule>;
    createJob(jobData: any, workerId: number): Promise<import(".prisma/client").Job>;
    updateJob(jobData: any, workerId: number, jobId: string): Promise<import(".prisma/client").Job>;
    getJob(id: string): Promise<import(".prisma/client").Job & {
        worker: import(".prisma/client").Worker;
        location_job: import(".prisma/client").LocationJob[];
    }>;
    listJobs(queries: any): Promise<(import(".prisma/client").Job & {
        worker: import(".prisma/client").Worker;
        location_job: import(".prisma/client").LocationJob[];
    })[]>;
    listJobsMore(queries: any, lastJobInResults: any): Promise<import(".prisma/client").Job[]>;
    searchJobs(queries: any, lastJobInResults: any): Promise<import(".prisma/client").Job[]>;
}
