import { TradeService } from './trade.service';
import { Signal, Trades, TradingSignal } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { CreateSignalDto, CreateTradeDto, CreateTradeSignalDto } from './dto/create-trade.dto';
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
    getAllPurchaseSignals(): Promise<TradingSignal[]>;
    getPurchaseSignal(id: string): Promise<TradingSignal>;
    createPurchaseSignal(tradeDto: CreateTradeSignalDto): Promise<TradingSignal>;
    updatePurchaseSignal(id: string, tradeDto: CreateTradeSignalDto): Promise<TradingSignal>;
    deletePurchaseSignal(id: string): Promise<TradingSignal>;
}
