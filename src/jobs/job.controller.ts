import { Controller, Get, Param, Query } from '@nestjs/common';
import { Direction } from './job.interface';
import { JobService } from './job.service';

@Controller('jobs')
export class JobController {
  private lastJobInResults: any;
  private firstJobInResults: any;

  constructor(private readonly jobService: JobService) {}

  @Get()
  async listJobs(@Query() queries: any) {
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
