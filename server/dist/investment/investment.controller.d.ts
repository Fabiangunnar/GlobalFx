import { InvestmentService } from './investment.service';
import { InvestDto } from './investmentdto/investment.dto';
import { UserService } from 'src/user/user.service';
import { InvestmentHistory } from '@prisma/client';
export declare class InvestmentController {
    private investmentService;
    private userService;
    constructor(investmentService: InvestmentService, userService: UserService);
    makeInvestment(investDto: InvestDto): Promise<InvestmentHistory>;
    getAllInvestments(): Promise<InvestmentHistory[]>;
    getMyInvestments(userId: string): Promise<InvestmentHistory[]>;
    updateInvestmentStatus(id: string, investDto: InvestDto): Promise<InvestmentHistory>;
}
