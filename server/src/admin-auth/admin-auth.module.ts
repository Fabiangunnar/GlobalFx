import { Module } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthController } from './admin-auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [AdminAuthService, PrismaService, UserService],
  controllers: [AdminAuthController],
})
export class AdminAuthModule {}
