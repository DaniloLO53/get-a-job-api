import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { DeleteRateDto, SignUpDto } from './worker.dto';
import { WorkerService } from './worker.service';

@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('sign-up')
  async create(@Body() signUpData: SignUpDto) {
    return await this.workerService.createProfile(signUpData);
  }

  @Get('/profiles/:workerId')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async getWorker(@Param('workerId') workerId: string) {
    return await this.workerService.getWorkerById(workerId);
  }

  @Get('/me')
  @Roles(Role.Worker)
  @UseGuards(AuthGuard)
  async getMyProfile(@Request() request: any) {
    return await this.workerService.getWorkerById(request.userId);
  }

  @Put('/me')
  @Roles(Role.Worker)
  @UseGuards(AuthGuard)
  async updateMyProfile(@Request() request: any, @Body() updatedData: any) {
    return await this.workerService.updateMyProfile(request.userId, updatedData);
  }

  @Post('/:workerId/rates')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async rate(@Body() rateData: any, @Request() request: any, @Param('workerId') workerId: string) {
    return await this.workerService.rate(rateData, workerId, request.userId);
  }

  @Get('/:workerId/rates')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async getRates(@Param('workerId') workerId: string) {
    return await this.workerService.getRates(workerId);
  }

  @Delete('/:workerId/rates/:rateId')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async deleteRate(@Request() request: any, @Param() params: DeleteRateDto) {
    return await this.workerService.deleteRate(request.userId, params);
  }
}
