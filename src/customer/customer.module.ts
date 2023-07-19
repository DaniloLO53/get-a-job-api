import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [CustomerService, PrismaService],
  exports: [CustomerService],
})
export class CustomerModule {}
