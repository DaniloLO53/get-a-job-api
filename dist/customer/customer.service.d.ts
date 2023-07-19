import { PrismaService } from '../prisma.service';
import { Customer } from '@prisma/client';
import { SignUpDto } from './customer.dto';
export declare class CustomerService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getProfileByEmail(email: string): Promise<Customer>;
    createProfileByOauth(signUpData: Pick<SignUpDto, 'email'>): Promise<Customer>;
    createProfile(signUpData: SignUpDto): Promise<Customer>;
}
