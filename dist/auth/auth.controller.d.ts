import { CustomerService } from 'src/customer/customer.service';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private readonly customerService;
    private readonly jwtService;
    constructor(authService: AuthService, customerService: CustomerService, jwtService: JwtService);
    signIn(body: SignInDto, userType: 'customer' | 'worker'): Promise<{
        token: string;
    }>;
    googleOauthHandler(query: any): Promise<{
        token: string;
    }>;
}
