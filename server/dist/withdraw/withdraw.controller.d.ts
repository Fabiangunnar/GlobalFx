import { WithdrawService } from './withdraw.service';
import { WithdrawalHistory } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
export declare class WithdrawController {
    private withdrawService;
    private userService;
    constructor(withdrawService: WithdrawService, userService: UserService);
    getAllWithdrawals(): Promise<WithdrawalHistory[]>;
    getMyWithdrawals(userId: string): Promise<WithdrawalHistory[]>;
    makeWithdrawal(withdraw: CreateWithdrawDto): Promise<{
        id: string;
        asset: string;
        walletAddress: string;
        amount: number;
        userId: string;
        transactionState: import(".prisma/client").$Enums.TransactionState;
        createdAt: Date;
    }>;
}
