import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SignUpDto } from './agreement.dto';
import { AgreementService } from './agreement.service';

@Controller('agreements')
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}

  @Post()
  async createAgreement(@Body() signUpData: SignUpDto) {
    // const { id, idSchedule } = params;

    // return await this.agreementService.createAgreement(id);
  }

  @Get()
  // @UseGuards(AuthGuard)
  test() {
    return 'Testing authenticaded route';
  }
}
