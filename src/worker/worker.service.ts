import { ConflictException, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Worker } from '@prisma/client';
import { DeleteRateDto, SignUpDto } from './worker.dto';
import * as bcrypt from 'bcrypt';
import { filterWorkerField } from './worker.helper';

@Injectable()
export class WorkerService {
  constructor(
    private readonly prismaService: PrismaService
  ) {}

  async getProfileByEmail(email: string): Promise<Worker> {
    return await this.prismaService.worker.findUnique({ where: { email } });
  }

  async getWorkerById(workerId: string) {
    const result = await this.prismaService.worker.findUnique({
      where: {
        id: Number(workerId)
      },
      include: {
        jobs: {
          include: {
            schedules: true,
            location_job: true,
          }},
        rates: true,
      },
    });
    return filterWorkerField(result)
  }

  async rate(rateData: any, workerId: string, customerId: number) {
    const { rate, comment } = rateData;

    console.log('workderId', workerId)
    console.log('customerId', customerId)

    return await this.prismaService.rate.create({
      data: {
        rate, comment, worker_id: Number(workerId), customer_id: customerId
      },
    });
  }

  async deleteRate(customerId: number, params: DeleteRateDto) {
    console.log(params)
    const { rateId } = params;
    const rate = await this.prismaService.rate.findUnique({
      where: {
        customer_id: customerId 
      }
    })
    if (!rate) throw new ConflictException({
      message: 'Rate not found'
    })
    if (rate.customer_id !== customerId) throw new UnauthorizedException({
      message: 'Can only delete own rate'
    })

    return await this.prismaService.rate.delete({
      where: {
        id: Number(rateId)
      }
    })
  }

  async getRates(workerId: string) {
    return await this.prismaService.rate.findMany({ where: { worker_id: Number(workerId) }});
  }

  async updateMyProfile(workerId: string, updatedData: any) {
    const { email, first_name, last_name, nickname } = updatedData;

    return await this.prismaService.worker.update({
      where: {
        id: Number(workerId)
      },
      data: {
        email, first_name, last_name, nickname
      },
    });
  }

  async createProfile(signUpData: SignUpDto) {
    const { password, confirmPassword, email, nickname } = signUpData;
    const emailWithTypeInfered = email as string;

    const workerAlreadyRegistered = await this.getProfileByEmail(email);
    if (workerAlreadyRegistered)
      throw new ConflictException({
        message: 'user already registered with given email',
      });
    if (password !== confirmPassword)
      throw new ConflictException({
        message: 'Confirm passoword does not match',
      });
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.prismaService.worker.create({
      data: {
        nickname,
        email: emailWithTypeInfered,
        password: hashedPassword,
      },
    });
  }
}
