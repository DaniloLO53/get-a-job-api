import { PrismaService } from '../prisma.service';
import { Worker } from '@prisma/client';
import { SignUpDto } from './agreement.dto';
export declare class AgreementService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getProfileByEmail(email: string): Promise<Worker>;
    createProfile(signUpData: SignUpDto): Promise<Worker>;
}
