import { Controller, Get, Param, Post, Query, Delete } from '@nestjs/common';
import { ScheduleDto } from './job.dto';
import { Direction } from './job.interface';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  private lastJobInResults: any;
  private firstJobInResults: any;

  constructor(private readonly jobService: JobService) {}

  @Delete('/:id/schedules/:idSchedule')
  async deleteSchedule(@Param() params: { id: string, idSchedule: string }) {
    const { id, idSchedule } = params;

    return await this.jobService.deleteSchedule(id);
  }

  @Post('/:id/schedules')
  async createSchedule(@Query() queries: ScheduleDto, @Param('id') id: string) {
    return await this.jobService.createSchedule(id, queries);
  }

  @Get('/:id/schedules')
  async getSchedules(@Param('id') id: string) {
    return await this.jobService.getSchedules(id);
  }

  @Get('/:id')
  async getJob(@Param('id') id: string) {
    return await this.jobService.getJob(id);
  }

  @Get()
  async listServices(@Query() queries: any) {
    return await this.jobService.listJobs(queries);
  }

  @Get('search')
  async searchJobs(@Query() queries: any) {
    const jobs = await this.jobService.searchJobs(
      queries,
      this.lastJobInResults,
    );
    this.lastJobInResults = jobs[6];
    this.firstJobInResults = jobs[0];

    return jobs;
  }

  @Get('search/pagination/:direction')
  async searchJobsPagination(
    @Query() queries: any,
    @Param('direction') direction: Direction,
  ) {
    const formatedDirection = direction.slice(1) as Direction;
    const cursor =
      formatedDirection === 'forward'
        ? this.lastJobInResults
        : this.firstJobInResults;

    const jobs = await this.jobService.searchJobsPagination(
      queries,
      cursor,
      formatedDirection,
    );
    this.lastJobInResults = jobs[6];
    this.firstJobInResults = jobs[0];

    return jobs;
  }
}
