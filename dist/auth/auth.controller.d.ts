import { UserService } from 'src/user/user.service';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly jwtService;
    constructor(authService: AuthService, userService: UserService, jwtService: JwtService);
    signIn(body: SignInDto): Promise<{
        token: string;
    }>;
    googleOauthHandler(query: any): Promise<{
        token: string;
    }>;
}
