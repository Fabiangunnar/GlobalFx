import { KYCVerification, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    getAllUsers(): Promise<User[] | null>;
    getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User>;
    deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User>;
    verifyKyc(data: Prisma.KYCVerificationUncheckedCreateInput): Promise<KYCVerification>;
    getAllKycDocuments(): Promise<KYCVerification[]>;
    getMyKycDocuments(where: Prisma.KYCVerificationWhereInput): Promise<KYCVerification[]>;
    updateKycStatus(where: Prisma.KYCVerificationWhereUniqueInput, data: Prisma.KYCVerificationUpdateInput): Promise<KYCVerification>;
    deleteKycStatus(where: Prisma.KYCVerificationWhereInput): any;
    updateUserInfo(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User>;
}
