import { UserService } from 'src/user/user.service';
import { SignInDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { GoogleInfos, GoogleTokensResult, GoogleUserResult } from './auth.interface';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    signIn(signInData: SignInDto): Promise<{
        token: string;
    }>;
    getGoogleUser({ id_token, access_token, }: GoogleInfos): Promise<GoogleUserResult>;
    getGoogleOAuthTokens({ code, }: {
        code: string;
    }): Promise<GoogleTokensResult>;
}
