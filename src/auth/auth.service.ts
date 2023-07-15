import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  GoogleInfos,
  GoogleTokensResult,
  GoogleUserResult,
} from './auth.interface';
import axios from 'axios';
import qs from 'qs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInData: SignInDto) {
    const { email, password: pass } = signInData;
    const userRegistered = await this.userService.getProfileByEmail(email);
    if (!userRegistered)
      throw new UnauthorizedException({ message: 'Invalid User' });

    const validatePassword = await bcrypt.compare(
      pass,
      userRegistered.password,
    );
    if (!validatePassword)
      throw new UnauthorizedException({ message: 'Invalid User' });
    const { password, ...result } = userRegistered;

    const token = await this.jwtService.signAsync({ result });
    return { token };
  }

  async getGoogleUser({
    id_token,
    access_token,
  }: GoogleInfos): Promise<GoogleUserResult> {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      },
    );

    return response.data;
  }

  async getGoogleOAuthTokens({
    code,
  }: {
    code: string;
  }): Promise<GoogleTokensResult> {
    const URL = 'https://oauth2.googleapis.com/token';
    const values = {
      code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URL,
      grant_type: 'authorization_code',
    };

    try {
      const response = await axios.post<GoogleTokensResult>(
        URL,
        qs.stringify(values),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      return response.data;
    } catch (error: any) {
      console.log(error, 'oauth');
      throw new Error(error.message);
    }
  }
}
