import { SignUpDto } from './worker.dto';
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
}
