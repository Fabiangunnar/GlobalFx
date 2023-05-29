/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { KYCVerification, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  getAllUsers(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    try {
      return await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (error) {
      return Promise.reject(
        new HttpException('User does not exist', HttpStatus.BAD_REQUEST),
      );
    }
  }
  deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  verifyKyc(
    data: Prisma.KYCVerificationUncheckedCreateInput,
  ): Promise<KYCVerification> {
    return this.prisma.kYCVerification.create({
      data,
    });
  }
  getAllKycDocuments(): Promise<KYCVerification[]> {
    return this.prisma.kYCVerification.findMany();
  }
  getMyKycDocuments(
    where: Prisma.KYCVerificationWhereInput,
  ): Promise<KYCVerification[]> {
    return this.prisma.kYCVerification.findMany({
      where,
    });
  }
  updateKycStatus(
    where: Prisma.KYCVerificationWhereUniqueInput,
    data: Prisma.KYCVerificationUpdateInput,
  ): Promise<KYCVerification> {
    return this.prisma.kYCVerification.update({
      where,
      data,
    });
  }

  deleteKycStatus(where: Prisma.KYCVerificationWhereInput): any {
    return this.prisma.kYCVerification.deleteMany({
      where,
    });
  }

  updateUserInfo(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where,
      data,
    });
  }
}
