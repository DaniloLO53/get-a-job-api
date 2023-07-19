import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from 'src/customer/customer.module';
import { WorkerModule } from 'src/worker/worker.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [
    CustomerModule,
    WorkerModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
