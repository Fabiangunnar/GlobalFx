import { InvestmentService } from './investment.service';
import { UserService } from 'src/user/user.service';
import { InvestmentHistory } from '@prisma/client';
import { CreateInvestmentDto } from './dto/create-investment.dto';
export declare class InvestmentController {
    private investmentService;
    private userService;
    constructor(investmentService: InvestmentService, userService: UserService);
    makeInvestment(investDto: CreateInvestmentDto): Promise<InvestmentHistory>;
    getAllInvestments(): Promise<InvestmentHistory[]>;
    getMyInvestments(userId: string): Promise<InvestmentHistory[]>;
    updateInvestmentStatus(id: string, investDto: CreateInvestmentDto): Promise<InvestmentHistory>;
}
