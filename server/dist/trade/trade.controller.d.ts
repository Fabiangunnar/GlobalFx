import { TradeService } from './trade.service';
import { Trades } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { CreateTradeDto } from './dto/create-trade.dto';
export declare class TradeController {
    private tradeService;
    private userService;
    constructor(tradeService: TradeService, userService: UserService);
    createTrade(tradeDto: CreateTradeDto): Promise<Trades>;
    getMyTrades(userId: string): Promise<Trades[]>;
    getAllTrades(): Promise<Trades[]>;
}
