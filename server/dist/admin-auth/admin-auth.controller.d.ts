import { Admin, DepositHistory, WithdrawalCode } from '@prisma/client';
import { AdminAuthService } from './admin-auth.service';
import { UserService } from 'src/user/user.service';
import { CreateAdminAuthDto } from './dto/create-admin-auth.dto';
import { UpdateAdminAuthDto } from './dto/update-admin-auth.dto';
import { UpdateDepositDto } from 'src/deposit/dto/update-deposit.dto';
export declare class AdminAuthController {
    private adminAuthService;
    private userService;
    constructor(adminAuthService: AdminAuthService, userService: UserService);
    createUser(user: CreateAdminAuthDto): Promise<Admin>;
    loginUser(user: CreateAdminAuthDto): Promise<Admin>;
    createCode(): Promise<WithdrawalCode>;
    getUser(id: string): Promise<Admin>;
    updateAdmin(user: UpdateAdminAuthDto, id: string): Promise<Admin>;
    getAdminArray(): Promise<Admin[]>;
    createDeposit(deposit: UpdateDepositDto): Promise<DepositHistory>;
}
