import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { SignUpDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfileByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({ where: { email } });
  }

  async createProfileByOauth(signUpData: Pick<SignUpDto, 'email'>) {
    const { email } = signUpData;
    const emailWithTypeInfered = email as string;

    const userAlreadyRegistered = await this.getProfileByEmail(email);
    if (userAlreadyRegistered)
      throw new ConflictException({
        message: 'User already registered with given email',
      });

    return await this.prismaService.user.create({
      data: {
        email: emailWithTypeInfered,
      },
    });
  }

  async createProfile(signUpData: SignUpDto) {
    const { password, confirmPassword, email } = signUpData;
    const emailWithTypeInfered = email as string;

    const userAlreadyRegistered = await this.getProfileByEmail(email);
    if (userAlreadyRegistered)
      throw new ConflictException({
        message: 'User already registered with given email',
      });
    if (password !== confirmPassword)
      throw new ConflictException({
        message: 'Confirm passoword does not match',
      });
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prismaService.user.create({
      data: {
        email: emailWithTypeInfered,
        password: hashedPassword,
      },
    });
  }
}
