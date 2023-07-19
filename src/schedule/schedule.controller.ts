// import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
// import { AuthGuard } from 'src/auth/auth.guard';
// import { SignUpDto } from './agreement.dto';
// import { JobProviderService } from './agreement.service';

// @Controller('schedules')
// export class JobProviderController {
//   constructor(private readonly jobProviderService: JobProviderService) {}

//   @Post('sign-up')
//   async create(@Body() signUpData: SignUpDto) {
//     return await this.jobProviderService.createProfile(signUpData);
//   }

//   @Get()
//   @UseGuards(AuthGuard)
//   test() {
//     return 'Testing authenticaded route';
//   }
// }
