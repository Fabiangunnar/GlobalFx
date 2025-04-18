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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeController = void 0;
const common_1 = require("@nestjs/common");
const trade_service_1 = require("./trade.service");
const user_service_1 = require("../user/user.service");
const create_trade_dto_1 = require("./dto/create-trade.dto");
let TradeController = class TradeController {
    constructor(tradeService, userService) {
        this.tradeService = tradeService;
        this.userService = userService;
    }
    async createTrade(tradeDto) {
        if (!tradeDto.amount ||
            !tradeDto.pairs ||
            !tradeDto.position ||
            !tradeDto.userId)
            throw new common_1.HttpException('', common_1.HttpStatus.BAD_REQUEST);
        const user = await this.userService.getUser({ id: tradeDto.userId });
        if (!user)
            throw new common_1.HttpException("User Doesn't exist", common_1.HttpStatus.BAD_REQUEST);
        if (Number(user.totalBalance) < Number(tradeDto.amount))
            throw new common_1.HttpException('Insufficient funds', common_1.HttpStatus.FORBIDDEN);
        const makeTrade = await this.tradeService.createTrade({
            pairs: tradeDto.pairs,
            amount: Number(tradeDto.amount),
            position: tradeDto.position,
            userId: tradeDto.userId,
        });
        await this.userService.updateUserInfo({ id: tradeDto.userId }, {
            totalBalance: user.totalBalance - tradeDto.amount,
        });
        return makeTrade;
    }
    async createSignal(tradeDto) {
        if (!tradeDto.amount ||
            !tradeDto.name ||
            !tradeDto.percentage ||
            !tradeDto.userId ||
            !tradeDto.description)
            throw new common_1.HttpException('', common_1.HttpStatus.BAD_REQUEST);
        const user = await this.userService.getUser({ id: tradeDto.userId });
        if (!user)
            throw new common_1.HttpException("User Doesn't exist", common_1.HttpStatus.BAD_REQUEST);
        if (Number(user.totalBalance) < Number(tradeDto.amount))
            throw new common_1.HttpException('Insufficient funds', common_1.HttpStatus.FORBIDDEN);
        const makeTrade = await this.tradeService.createSignal({
            name: tradeDto.name,
            amount: Number(tradeDto.amount),
            percentage: Number(tradeDto.percentage),
            userId: tradeDto.userId,
            description: tradeDto.description,
        });
        await this.userService.updateUserInfo({ id: tradeDto.userId }, {
            totalBalance: user.totalBalance - tradeDto.amount,
        });
        return makeTrade;
    }
    async getMyTrades(userId) {
        if (!userId)
            throw new common_1.HttpException('Id is undefined', common_1.HttpStatus.BAD_REQUEST);
        return this.tradeService.getMyTrades({ userId });
    }
    async getMySignals(userId) {
        if (!userId)
            throw new common_1.HttpException('Id is undefined', common_1.HttpStatus.BAD_REQUEST);
        return this.tradeService.getMySignals({ userId });
    }
    async getAllTrades() {
        const allTrades = await this.tradeService.getAllTrades();
        const users = await this.userService.getAllUsers();
        const newTrades = allTrades.map((trades) => {
            const { lastname, firstname } = users.find((user) => user.id === trades.userId);
            return { ...trades, username: `${firstname} ${lastname}` };
        });
        return newTrades;
    }
    async getAllSignals() {
        return this.tradeService.getAllSignals();
    }
    async getAllPurchaseSignals() {
        return this.tradeService.getAllTradeSignals();
    }
    async getPurchaseSignal(id) {
        return this.tradeService.getTradeSignal({ id });
    }
    async createPurchaseSignal(tradeDto) {
        return this.tradeService.createTradeSignal(tradeDto);
    }
    async updatePurchaseSignal(id, tradeDto) {
        return this.tradeService.updateTradeSignal({ id }, tradeDto);
    }
    async deletePurchaseSignal(id) {
        return this.tradeService.deleteTradeSignal({ id });
    }
};
exports.TradeController = TradeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trade_dto_1.CreateTradeDto]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "createTrade", null);
__decorate([
    (0, common_1.Post)('signal'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trade_dto_1.CreateSignalDto]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "createSignal", null);
__decorate([
    (0, common_1.Get)('/my/trades/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getMyTrades", null);
__decorate([
    (0, common_1.Get)('/my/signals/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getMySignals", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getAllTrades", null);
__decorate([
    (0, common_1.Get)('all/signals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getAllSignals", null);
__decorate([
    (0, common_1.Get)('all/trade-signals/purchase'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getAllPurchaseSignals", null);
__decorate([
    (0, common_1.Get)('all/trade-signals/purchase/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getPurchaseSignal", null);
__decorate([
    (0, common_1.Post)('all/trade-signals/purchase'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trade_dto_1.CreateTradeSignalDto]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "createPurchaseSignal", null);
__decorate([
    (0, common_1.Put)('all/trade-signals/purchase/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_trade_dto_1.CreateTradeSignalDto]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "updatePurchaseSignal", null);
__decorate([
    (0, common_1.Delete)('all/trade-signals/purchase/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "deletePurchaseSignal", null);
exports.TradeController = TradeController = __decorate([
    (0, common_1.Controller)('trade'),
    __metadata("design:paramtypes", [trade_service_1.TradeService,
        user_service_1.UserService])
], TradeController);
//# sourceMappingURL=trade.controller.js.map