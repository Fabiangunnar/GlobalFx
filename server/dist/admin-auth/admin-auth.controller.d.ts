import { adminAuthDto } from './admin-auth-dto/adminAuth.dto';
import { Admin, DepositHistory, WithdrawalCode } from '@prisma/client';
import { AdminAuthService } from './admin-auth.service';
import { DepositDto } from 'src/deposit/depositDto/deposit.dto';
import { UserService } from 'src/user/user.service';
export declare class AdminAuthController {
    private adminAuthService;
    private userService;
    constructor(adminAuthService: AdminAuthService, userService: UserService);
    createUser(user: adminAuthDto): Promise<Admin>;
    loginUser(user: adminAuthDto): Promise<Admin>;
    createCode(): Promise<WithdrawalCode>;
    getUser(id: string): Promise<Admin>;
    updateAdmin(user: adminAuthDto, id: string): Promise<Admin>;
    getAdminArray(): Promise<Admin[]>;
    createDeposit(deposit: DepositDto): Promise<DepositHistory>;
}
