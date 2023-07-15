import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SignUpDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async create(@Body() signUpData: SignUpDto) {
    return await this.userService.createProfile(signUpData);
  }

  @Get()
  @UseGuards(AuthGuard)
  test() {
    return 'Testing authenticaded route';
  }
}
