import { TradeService } from './trade.service';
import { Signal, Trades } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { CreateSignalDto, CreateTradeDto } from './dto/create-trade.dto';
export declare class TradeController {
    private tradeService;
    private userService;
    constructor(tradeService: TradeService, userService: UserService);
    createTrade(tradeDto: CreateTradeDto): Promise<Trades>;
    createSignal(tradeDto: CreateSignalDto): Promise<Signal>;
    getMyTrades(userId: string): Promise<Trades[]>;
    getMySignals(userId: string): Promise<Signal[]>;
    getAllTrades(): Promise<Trades[]>;
    getAllSignals(): Promise<Signal[]>;
}
