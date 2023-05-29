import { TradeService } from './trade.service';
import { TradeDto } from './tradeDto/trade.dto';
import { Trades } from '@prisma/client';
import { UserService } from 'src/user/user.service';
export declare class TradeController {
    private tradeService;
    private userService;
    constructor(tradeService: TradeService, userService: UserService);
    createTrade(tradeDto: TradeDto): Promise<Trades>;
    getMyTrades(userId: string): Promise<Trades[]>;
    getAllTrades(): Promise<Trades[]>;
}
