import { PrismaService } from 'src/prisma.service';
import { ScheduleDto } from './job.dto';
import { Direction } from './job.interface';
export declare class JobService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    deleteSchedule(id: string): Promise<import(".prisma/client").Schedule>;
    getSchedules(id: string): Promise<import(".prisma/client").Schedule[]>;
    createSchedule(id: string, queries: ScheduleDto): Promise<import(".prisma/client").Schedule>;
    getJob(id: string): Promise<import(".prisma/client").Job & {
        worker: import(".prisma/client").Worker;
        location_job: import(".prisma/client").LocationJob[];
    }>;
    listJobs(queries: any): Promise<(import(".prisma/client").Job & {
        worker: import(".prisma/client").Worker;
        location_job: import(".prisma/client").LocationJob[];
    })[]>;
    searchJobsPagination(queries: any, lastJobInResults: any, direction: Direction): Promise<import(".prisma/client").Job[]>;
    searchJobs(queries: any, lastJobInResults: any): Promise<import(".prisma/client").Job[]>;
}
