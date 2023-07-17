import { PrismaService } from 'src/prisma.service';
import { Direction } from './job.interface';
export declare class JobService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    listJobs(queries: any): Promise<any>;
    searchJobsPagination(queries: any, lastJobInResults: any, direction: Direction): Promise<any>;
    searchJobs(queries: any, lastJobInResults: any): Promise<any>;
}
