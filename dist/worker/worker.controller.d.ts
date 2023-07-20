import { DeleteRateDto, SignUpDto } from './worker.dto';
import { WorkerService } from './worker.service';
export declare class WorkerController {
    private readonly workerService;
    constructor(workerService: WorkerService);
    create(signUpData: SignUpDto): Promise<import(".prisma/client").Worker>;
    getWorker(workerId: string): Promise<{
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
    getMyProfile(request: any): Promise<{
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
    updateMyProfile(request: any, updatedData: any): Promise<import(".prisma/client").Worker>;
    rate(rateData: any, request: any, workerId: string): Promise<import(".prisma/client").Rate>;
    getRates(workerId: string): Promise<import(".prisma/client").Rate[]>;
    deleteRate(request: any, params: DeleteRateDto): Promise<import(".prisma/client").Rate>;
}
