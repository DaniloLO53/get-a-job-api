import { PrismaService } from 'src/prisma.service';
import { Direction } from './job.interface';
export declare class JobService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    listJobs(queries: any): Promise<(import(".prisma/client").Job & {
        company: import(".prisma/client").Company;
    })[]>;
    searchJobsPagination(queries: any, lastJobInResults: any, direction: Direction): Promise<import(".prisma/client").Job[]>;
    searchJobs(queries: any, lastJobInResults: any): Promise<import(".prisma/client").Job[]>;
}
