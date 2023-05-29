import { Module } from '@nestjs/common'
import { SupportController } from './support.controller'
import { SupportService } from './support.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'

@Module({
  controllers: [SupportController],
  providers: [SupportService, PrismaService, UserService],
})
export class SupportModule {}
