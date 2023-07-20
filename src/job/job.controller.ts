import { Controller, Get, Param, Post, Query, Delete, UseGuards, Body, Request, Put } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
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
