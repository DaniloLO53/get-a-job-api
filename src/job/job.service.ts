import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { DeleteAgreementDto, DeleteScheduleDto, ScheduleDto } from './job.dto';

@Injectable()
export class JobService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAgreement(params: DeleteScheduleDto, customerId: number) {
    const { scheduleId, jobId } = params;

    const job = await this.prismaService.job.findUnique({
      where: {
       id: Number(jobId)
      }
    });
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
        id: Number(scheduleId)
      }
    });
    const agreement = await this.prismaService.agreement.findUnique({
      where: {
        schedule_id: Number(scheduleId)
      }
    });

    if (!schedule || !job) throw new ConflictException({
      message: 'No job or schedule found'
    });
    if (agreement) throw new ConflictException({
      message: 'Schedule is already agreed'
    });

    return await this.prismaService.agreement.create({
      data: {
        schedule_id: Number(scheduleId),
        customer_id: customerId
      }
    })
  }

  async getAgreement(params: DeleteScheduleDto, customerId: number) {
    const { scheduleId, jobId } = params;

    const job = await this.prismaService.job.findUnique({
      where: {
       id: Number(jobId)
      }
    });
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
        id: Number(scheduleId)
      }
    });

    if (!schedule || !job) throw new ConflictException({
      message: 'No job or schedule or agreement found'
    });

    return await this.prismaService.agreement.findUnique({
      where: {
        schedule_id: Number(scheduleId)
      }
    })
  }

  async deleteAgreement(params: DeleteAgreementDto, userId: number, roles: string[]) {
    const { jobId, scheduleId, agreementId } = params;
    const [role] = roles;

    const job = await this.prismaService.job.findUnique({
       where: {
        id: Number(jobId)
       }
    });
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
       id: Number(scheduleId)
      }
    });
    const agreement = await this.prismaService.agreement.findUnique({
      where: {
      id: Number(agreementId)
      }
    });

    if (!schedule || !job || !agreement) throw new ConflictException({
      message: 'No job or schedule or agreement found'
    });
    if (
      (role === 'worker' && job.worker_id !== userId) ||
      (role === 'customer' && agreement.customer_id !== userId)
    ) throw new UnauthorizedException({
      message: 'Can only modify own content'
    });

    return await this.prismaService.agreement.delete({
      where: {
        id: Number(agreementId)
      }
    })
  }
  

  async deleteSchedule(params: DeleteScheduleDto, workerId: number) {
    const { jobId, scheduleId } = params;

    const job = await this.prismaService.job.findUnique({
       where: {
        id: Number(jobId)
       }
    });
    const schedule = await this.prismaService.schedule.findUnique({
      where: {
       id: Number(scheduleId)
      }
   });

    if (!schedule || !job) throw new ConflictException({
      message: 'No job or schedule found'
    });
    if (job.worker_id !== workerId) throw new UnauthorizedException({
      message: 'Can only modify own content'
    });

    return await this.prismaService.schedule.delete({
      where: {
        id: Number(scheduleId)
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

  async createSchedule(scheduleData: ScheduleDto, workerId: number, jobId: string) {
    const job = await this.prismaService.job.findUnique({ where: { id: Number(jobId) }});

    if (!job) throw new ConflictException({ message: 'No jobs found' });
    if (job.worker_id !== Number(workerId)) throw new UnauthorizedException({
      message: 'Can only modify own content'
    });

    return await this.prismaService.schedule.create({
      data: {
        day: scheduleData.day,
        day_hour_start: scheduleData.day_hour_start,
        day_hour_end: scheduleData.day_hour_end,
        job_id: Number(jobId)
      }
    })
  }

  async createJob(jobData: any, workerId: number) {
    const { title, description, min_price, max_price } = jobData;

    return await this.prismaService.job.create({
      data: {
        title, description, max_price, min_price, worker_id: workerId
      }
    })
  }

  async updateJob(jobData: any, workerId: number, jobId: string) {
    const { title, description, min_price, max_price } = jobData;

    const job = await this.prismaService.job.findUnique({ where: { id: Number(jobId) }});

    if (!job) throw new ConflictException({ message: 'No jobs found' });
    if (job.worker_id !== Number(workerId)) throw new UnauthorizedException({
      message: 'Can only modify own content'
    });

    return await this.prismaService.job.update({
      where: {
        id: Number(jobId)
      },
      data: {
        title, description, max_price, min_price, worker_id: workerId
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
    const { title, minRate, region, city, state } = queries;
    let where = {};

    if (minRate) where = { ...where, minRate };
    if (title)
      where = {
        ...where,
        title: { contains: title, mode: Prisma.QueryMode.insensitive },
      };
    if (state)
      where = {
        ...where,
        location_job: {
          some: {
            state: { contains: state, mode: Prisma.QueryMode.insensitive },
          }
        }
      };
    
    return await this.prismaService.job.findMany({
      where,
      take: 3,
      include: {
        worker: true,
        location_job: true
      },
    });
  }

  async listJobsMore(
    queries: any,
    lastJobInResults: any,
  ) {
    let prismaOptions = {};
    const { title, minRate, region, city, state } = queries;
    let where = {};

    if (minRate) where = { ...where, minRate };
    if (title)
      where = {
        ...where,
        title: { contains: title, mode: Prisma.QueryMode.insensitive },
      };
    if (state)
      where = {
        ...where,
        location_job: {
          some: {
            state: { contains: state, mode: Prisma.QueryMode.insensitive },
          }
        }
      };

    if (!lastJobInResults)
      throw new ConflictException({ message: 'No results at searching' });

    prismaOptions = {
      where,
      include: {
        worker: true,
        location_job: true,
      },
      take: 3,
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
      take: 3,
    };

    return await this.prismaService.job.findMany(prismaOptions);
  }
}
