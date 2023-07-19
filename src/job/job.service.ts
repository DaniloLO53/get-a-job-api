import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ScheduleDto } from './job.dto';
import { Direction } from './job.interface';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteSchedule(id: string) {
    return await this.prismaService.schedule.delete({
      where: {
        id: Number(id)
      }
    })
  }

  async getSchedules(id: string) {
    return await this.prismaService.schedule.findMany({
      where: {
        job_id: Number(id)
      }
    })
  }

  async createSchedule(id: string, queries: ScheduleDto) {
    return await this.prismaService.schedule.create({
      data: {
        day: queries.day,
        day_hour_start: queries.day_hour_start,
        day_hour_end: queries.day_hour_end,
        job_id: Number(id)
      }
    })
  }

  async getJob(id: string) {
    return await this.prismaService.job.findUnique({
      where: { id: Number(id) },
      include: { worker: true, location_job: true }
    })
  }

  async listJobs(queries: any) {
    const { title, description, id } = queries;
    let where = {};

    if (title)
      where = {
        ...where,
        title: { contains: title, mode: Prisma.QueryMode.insensitive },
      };
    if (description)
      where = {
        ...where,
        description: {
          contains: description,
          mode: Prisma.QueryMode.insensitive,
        },
      };
    if (id) where = { ...where, id };

    return await this.prismaService.job.findMany({
      where,
      include: {
        worker: true,
        location_job: true,
      },
    });
  }

  async searchJobsPagination(
    queries: any,
    lastJobInResults: any,
    direction: Direction,
  ) {
    const { title } = queries;
    let prismaOptions = {};
    const where = {
      title: { contains: title, mode: Prisma.QueryMode.insensitive },
    };

    if (!lastJobInResults)
      throw new ConflictException({ message: 'No results at searching' });

    prismaOptions = {
      where,
      include: {
        job_provider: true,
        location_job: true,
      },
      take: direction === 'forward' ? 7 : -7,
      skip: 1,
      cursor: {
        id: lastJobInResults.id,
      },
    };

    return await this.prismaService.job.findMany(prismaOptions);
  }

  async searchJobs(queries: any, lastJobInResults: any) {
    const { searchQuery } = queries;
    let prismaOptions = {};
    const where = {
      OR: [
        {
          title: { contains: searchQuery, mode: Prisma.QueryMode.insensitive },
        },
        {
          location: {
            contains: searchQuery,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    };

    prismaOptions = {
      where,
      include: {
        job_provider: true,
        location_job: true,
      },
      take: 7,
    };

    return await this.prismaService.job.findMany(prismaOptions);
  }
}
