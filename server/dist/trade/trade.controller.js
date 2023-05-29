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
    async getMyTrades(userId) {
        if (!userId)
            throw new common_1.HttpException('Id is undefined', common_1.HttpStatus.BAD_REQUEST);
        return this.tradeService.getMyTrades({ userId });
    }
    async getAllTrades() {
        const allTrades = await this.tradeService.getAllTrades();
        const users = await this.userService.getAllUsers();
        const newTrades = allTrades.map((trades) => {
            const { lastname, firstname } = users.find((user) => user.id === trades.userId);
            return Object.assign(Object.assign({}, trades), { username: `${firstname} ${lastname}` });
        });
        return newTrades;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "createTrade", null);
__decorate([
    (0, common_1.Get)('/my/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getMyTrades", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TradeController.prototype, "getAllTrades", null);
TradeController = __decorate([
    (0, common_1.Controller)('trade'),
    __metadata("design:paramtypes", [trade_service_1.TradeService,
        user_service_1.UserService])
], TradeController);
exports.TradeController = TradeController;
//# sourceMappingURL=trade.controller.js.map