import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(6)
  password?: string;
}
