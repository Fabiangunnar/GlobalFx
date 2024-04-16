import { DepositService } from './deposit.service';
import { UserService } from 'src/user/user.service';
import { DepositHistory, PendingDepositHistory } from '@prisma/client';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { UpdateDepositDto } from './dto/update-deposit.dto';
export declare class DepositController {
    private depositService;
    private userService;
    constructor(depositService: DepositService, userService: UserService);
    createUserDeposit(deposit: UpdateDepositDto, userId: string): Promise<DepositHistory>;
    createDeposit(deposit: CreateDepositDto): Promise<DepositHistory>;
    getAllDepositHistory(): Promise<DepositHistory[]>;
    getMyVerifiedDepositHistory(userId: string): Promise<DepositHistory[]>;
    getMyDepositHistory(userId: string): Promise<DepositHistory[]>;
    getMyPendingDeposits(userId: string): Promise<PendingDepositHistory[]>;
    verifyTransaction(deposit: UpdateDepositDto, id: string): Promise<DepositHistory | any>;
    updateDeposit(deposit: UpdateDepositDto, id: string): Promise<DepositHistory | any>;
    deleteMyDeposit(id: string): Promise<DepositHistory | any>;
}
