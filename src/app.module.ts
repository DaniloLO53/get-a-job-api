import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JobModule } from './job/job.module';
import { CustomerModule } from './customer/customer.module';
import { WorkerModule } from './worker/worker.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports:
    [
      ConfigModule.forRoot(),
      AuthModule,
      CustomerModule,
      JobModule,
      WorkerModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
