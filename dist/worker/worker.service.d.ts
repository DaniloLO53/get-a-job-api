import { PrismaService } from '../prisma.service';
import { Worker } from '@prisma/client';
import { DeleteRateDto, SignUpDto } from './worker.dto';
export declare class WorkerService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getProfileByEmail(email: string): Promise<Worker>;
    getWorkerById(workerId: string): Promise<{
        first_name: string;
        last_name: string;
        nickname: string;
        email: string;
        jobs: {
            title: any;
            description: any;
            min_price: any;
            max_price: any;
            schedules: {
                day: any;
                day_hour_start: any;
                day_hour_end: any;
            }[];
            location_job: {
                state: any;
                city: any;
                region: any;
            }[];
        }[];
        rates: import(".prisma/client").Rate[];
    }>;
    rate(rateData: any, workerId: string, customerId: number): Promise<import(".prisma/client").Rate>;
    deleteRate(customerId: number, params: DeleteRateDto): Promise<import(".prisma/client").Rate>;
    getRates(workerId: string): Promise<import(".prisma/client").Rate[]>;
    updateMyProfile(workerId: string, updatedData: any): Promise<Worker>;
    createProfile(signUpData: SignUpDto): Promise<Worker>;
}
