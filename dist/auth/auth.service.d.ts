import { CustomerService } from 'src/customer/customer.service';
import { SignInDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { GoogleInfos, GoogleTokensResult, GoogleUserResult } from './auth.interface';
import { WorkerService } from 'src/worker/worker.service';
export declare class AuthService {
    private readonly customerService;
    private readonly workerService;
    private readonly jwtService;
    constructor(customerService: CustomerService, workerService: WorkerService, jwtService: JwtService);
    signIn(signInData: SignInDto, userType: 'customer' | 'worker'): Promise<{
        token: string;
    }>;
    getGoogleUser({ id_token, access_token, }: GoogleInfos): Promise<GoogleUserResult>;
    getGoogleOAuthTokens({ code, }: {
        code: string;
    }): Promise<GoogleTokensResult>;
}
