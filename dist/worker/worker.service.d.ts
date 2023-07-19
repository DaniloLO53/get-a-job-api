import { PrismaService } from '../prisma.service';
import { Worker } from '@prisma/client';
import { SignUpDto } from './worker.dto';
export declare class WorkerService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getProfileByEmail(email: string): Promise<Worker>;
    createProfile(signUpData: SignUpDto): Promise<Worker>;
}
