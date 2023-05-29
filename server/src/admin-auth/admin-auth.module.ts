import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AdminAuthService, PrismaService],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
