"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TradeService = class TradeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createTrade(data) {
        return this.prisma.trades.create({ data });
    }
    createSignal(data) {
        return this.prisma.signal.create({ data });
    }
    getAllTrades() {
        return this.prisma.trades.findMany();
    }
    getAllSignals() {
        return this.prisma.signal.findMany({
            include: {
                user: true,
            },
        });
    }
    getTradeSignal(where) {
        return this.prisma.tradingSignal.findUnique({ where });
    }
    createTradeSignal(data) {
        return this.prisma.tradingSignal.create({ data });
    }
    getAllTradeSignals() {
        return this.prisma.tradingSignal.findMany();
    }
    updateTradeSignal(where, data) {
        return this.prisma.tradingSignal.update({ where, data });
    }
    deleteTradeSignal(where) {
        return this.prisma.tradingSignal.delete({ where });
    }
    getMyTrades(where) {
        return this.prisma.trades.findMany({ where });
    }
    getMySignals(where) {
        return this.prisma.signal.findMany({ where });
    }
    deleteMyTrades(where) {
        return this.prisma.trades.deleteMany({ where });
    }
    deleteMySignals(where) {
        return this.prisma.signal.deleteMany({ where });
    }
};
exports.TradeService = TradeService;
exports.TradeService = TradeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TradeService);
//# sourceMappingURL=trade.service.js.map