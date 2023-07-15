import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Direction } from './job.interface';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

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
        company: true,
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
        company: true,
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
        company: true,
      },
      take: 7,
    };

    return await this.prismaService.job.findMany(prismaOptions);
  }
}
