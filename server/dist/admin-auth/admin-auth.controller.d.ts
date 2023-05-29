import { adminAuthDto } from './admin-auth-dto/adminAuth.dto';
import { Admin, WithdrawalCode } from '@prisma/client';
import { AdminAuthService } from './admin-auth.service';
export declare class AdminAuthController {
    private adminAuthService;
    constructor(adminAuthService: AdminAuthService);
    createUser(user: adminAuthDto): Promise<Admin>;
    loginUser(user: adminAuthDto): Promise<Admin>;
    createCode(): Promise<WithdrawalCode>;
    getUser(id: string): Promise<Admin>;
    updateAdmin(user: adminAuthDto, id: string): Promise<Admin>;
    getAdminArray(): Promise<Admin[]>;
}
