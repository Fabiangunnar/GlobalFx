import { DepositService } from './deposit.service';
import { UserService } from 'src/user/user.service';
import { DepositDto } from './depositDto/deposit.dto';
import { DepositHistory, PendingDepositHistory } from '@prisma/client';
export declare class DepositController {
    private depositService;
    private userService;
    constructor(depositService: DepositService, userService: UserService);
    createDeposit(deposit: DepositDto): Promise<DepositHistory>;
    getAllDepositHistory(): Promise<DepositHistory[]>;
    getMyDepositHistory(userId: string): Promise<DepositHistory[]>;
    getMyPendingDeposits(userId: string): Promise<PendingDepositHistory[]>;
    verifyTransaction(deposit: DepositDto, id: string): Promise<DepositHistory | any>;
    updateDeposit(deposit: DepositDto, id: string): Promise<DepositHistory | any>;
}
