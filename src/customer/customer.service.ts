import { ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Customer } from '@prisma/client';
import { SignUpDto } from './customer.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getProfileByEmail(email: string): Promise<Customer> {
    return await this.prismaService.customer.findUnique({ where: { email } });
  }

  async createProfileByOauth(signUpData: Pick<SignUpDto, 'email'>) {
    const { email } = signUpData;
    const emailWithTypeInfered = email as string;

    const customerAlreadyRegistered = await this.getProfileByEmail(email);
    if (customerAlreadyRegistered)
      throw new ConflictException({
        message: 'customer already registered with given email',
      });

    return await this.prismaService.customer.create({
      data: {
        email: emailWithTypeInfered,
      },
    });
  }

  async createProfile(signUpData: SignUpDto) {
    const { password, confirmPassword, email } = signUpData;
    const emailWithTypeInfered = email as string;

    const customerAlreadyRegistered = await this.getProfileByEmail(email);
    if (customerAlreadyRegistered)
      throw new ConflictException({
        message: 'customer already registered with given email',
      });
    if (password !== confirmPassword)
      throw new ConflictException({
        message: 'Confirm passoword does not match',
      });
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prismaService.customer.create({
      data: {
        email: emailWithTypeInfered,
        password: hashedPassword,
      },
    });
  }
}
