import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { SignUpDto } from './worker.dto';
import { WorkerService } from './worker.service';

@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @Post('sign-up')
  async create(@Body() signUpData: SignUpDto) {
    return await this.workerService.createProfile(signUpData);
  }

  @Get('/:workerId')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async getWorker(@Param('workerId') workerId: string) {
    return 'Testing authenticaded route';
  }
}
