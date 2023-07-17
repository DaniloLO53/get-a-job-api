import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { SignUpDto } from './user.dto';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getProfileByEmail(email: string): Promise<User>;
    createProfileByOauth(signUpData: Pick<SignUpDto, 'email'>): Promise<any>;
    createProfile(signUpData: SignUpDto): Promise<any>;
}
