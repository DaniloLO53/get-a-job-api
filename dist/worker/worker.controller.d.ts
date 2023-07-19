import { SignUpDto } from './worker.dto';
import { WorkerService } from './worker.service';
export declare class WorkerController {
    private readonly workerService;
    constructor(workerService: WorkerService);
    create(signUpData: SignUpDto): Promise<import(".prisma/client").Worker>;
    getWorker(workerId: string): Promise<string>;
}
