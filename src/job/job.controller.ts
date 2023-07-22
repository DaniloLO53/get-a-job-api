import { Controller, Get, Param, Post, Query, Delete, UseGuards, Body, Request, Put } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { DeleteAgreementDto, DeleteScheduleDto, ScheduleDto } from './job.dto';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  private lastJobInResults: any;

  constructor(private readonly jobService: JobService) {}

  @Post()
  @Roles(Role.Worker)
  @UseGuards(AuthGuard)
  async createJob(@Body() jobData: any, @Request() request: any) {
    return await this.jobService.createJob(jobData, request.userId);
  }

  @Put('/:jobId')
  @Roles(Role.Worker)
  @UseGuards(AuthGuard)
  async updateJob(@Body() jobData: any, @Request() request: any, @Param('jobId') jobId: string) {
    return await this.jobService.updateJob(jobData, request.userId, jobId);
  }

  @Get('/:jobId')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async getJob(@Param('jobId') jobId: string) {
    return await this.jobService.getJob(jobId);
  }

  @Post('/:jobId/schedules')
  @Roles(Role.Worker)
  @UseGuards(AuthGuard)
  async createSchedule(@Body() scheduleData: ScheduleDto, @Request() request: any, @Param('jobId') jobId: string) {
    return await this.jobService.createSchedule(scheduleData, request.userId, jobId);
  }

  @Get('/:jobId/schedules')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async getSchedules(@Param('jobId') jobId: string) {
    return await this.jobService.getSchedules(jobId);
  }

  @Delete('/:jobId/schedules/:scheduleId')
  @Roles(Role.Worker)
  @UseGuards(AuthGuard)
  async deleteSchedule(@Param() params: DeleteScheduleDto, @Request() request: any) {
    return await this.jobService.deleteSchedule(params, request.userId);
  }

  @Delete('/:jobId/schedules/:scheduleId/agreement/:agreementId')
  @Roles(Role.Customer, Role.Worker)
  @UseGuards(AuthGuard)
  async deleteAgreement(@Param() params: DeleteAgreementDto, @Request() request: any) {
    return await this.jobService.deleteAgreement(params, request.userId, request.roles);
  }

  @Post('/:jobId/schedules/:scheduleId/agreement')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async createAgreement(@Param() params: DeleteScheduleDto, @Request() request: any) {
    return await this.jobService.createAgreement(params, request.userId);
  }

  @Get('/:jobId/schedules/:scheduleId/agreement')
  @Roles(Role.Customer, Role.Worker)
  @UseGuards(AuthGuard)
  async getAgreement(@Param() params: DeleteScheduleDto, @Request() request: any) {
    return await this.jobService.getAgreement(params, request.userId);
  }

  @Get('feed')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async listJobs(@Query() queries: any) {
    const jobs = await this.jobService.listJobs(queries);
    this.lastJobInResults = jobs[2];

    return jobs;
  }

  @Get('/feed/more')
  @Roles(Role.Customer)
  @UseGuards(AuthGuard)
  async listJobsMore(@Query() queries: any) {
    const cursor = this.lastJobInResults;

    const jobs = await this.jobService.listJobsMore(queries, cursor);
    this.lastJobInResults = jobs[2];

    return jobs;
  }
}
