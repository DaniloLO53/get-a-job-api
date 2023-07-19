import { ConflictException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Worker } from '@prisma/client';
import { SignUpDto } from './worker.dto';
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
