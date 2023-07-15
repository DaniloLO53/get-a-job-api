import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Prisma } from '@prisma/client';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;
}
