import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';

@Module({
  imports: [],
  controllers: [WorkerController],
  providers: [WorkerService, PrismaService],
  exports: [WorkerService],
})
export class WorkerModule {}
