import { WithdrawService } from './withdraw.service';
import { WithdrawalHistory } from '@prisma/client';
import { DepositDto as WithdrawDto } from 'src/deposit/depositDto/deposit.dto';
import { UserService } from 'src/user/user.service';
export declare class WithdrawController {
    private withdrawService;
    private userService;
    constructor(withdrawService: WithdrawService, userService: UserService);
    getAllWithdrawals(): Promise<WithdrawalHistory[]>;
    getMyWithdrawals(userId: string): Promise<WithdrawalHistory[]>;
    makeWithdrawal(withdraw: WithdrawDto): Promise<WithdrawalHistory>;
}
