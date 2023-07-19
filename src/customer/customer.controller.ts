import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SignUpDto } from './customer.dto';
import { CustomerService } from './customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('sign-up')
  async create(@Body() signUpData: SignUpDto) {
    return await this.customerService.createProfile(signUpData);
  }

  @Get()
  // @UseGuards(AuthGuard)
  test() {
    return 'Testing authenticaded route';
  }
}
