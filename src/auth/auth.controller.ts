import {
  Body,
  Controller,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInDto) {
    return await this.authService.signIn(body);
  }

  @Post('/oauth/google')
  async googleOauthHandler(@Query() query: any) {
    const code = query.code as string;

    try {
      const { id_token, access_token } =
        await this.authService.getGoogleOAuthTokens({ code });
      // const googleUser = jwt.decode(id_token);
      const googleUser = await this.authService.getGoogleUser({
        id_token,
        access_token,
      });

      const dbUser = await this.userService.createProfileByOauth({
        email: googleUser.email,
      });

      const token = await this.jwtService.signAsync({ dbUser });
      return { token };
    } catch (error) {
      throw new UnauthorizedException({ 'error: ': error });
    }
  }
}
