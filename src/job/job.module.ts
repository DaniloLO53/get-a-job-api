import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports: [],
  controllers: [JobController],
  providers: [JobService, PrismaService],
  exports: [JobService],
})
export class JobModule {}
