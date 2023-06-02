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
exports.WithdrawController = void 0;
const common_1 = require("@nestjs/common");
const withdraw_service_1 = require("./withdraw.service");
const user_service_1 = require("../user/user.service");
let WithdrawController = class WithdrawController {
    constructor(withdrawService, userService) {
        this.withdrawService = withdrawService;
        this.userService = userService;
    }
    async getAllWithdrawals() {
        try {
            const withdrawData = await this.withdrawService.getAllWithdrawals();
            const users = await this.userService.getAllUsers();
            const newWithdrawData = withdrawData.map((withdraw) => {
                const { firstname, lastname } = users.find((user) => user.id === withdraw.userId);
                return Object.assign(Object.assign({}, withdraw), { firstname, lastname });
            });
            return newWithdrawData;
        }
        catch (error) {
            throw new common_1.HttpException(error.response, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getMyWithdrawals(userId) {
        return this.withdrawService.getMyWithdrawals({
            userId,
        });
    }
    async makeWithdrawal(withdraw) {
        try {
            if (!withdraw.asset ||
                !withdraw.amount ||
                !withdraw.userId ||
                !withdraw.walletAddress ||
                !withdraw.walletCode)
                throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
            const user = await this.userService.getUser({ id: withdraw.userId });
            const isWithdrawCode = await this.withdrawService.getWalletCode({
                withdrawalCode: withdraw.walletCode,
            });
            if (!isWithdrawCode)
                throw new common_1.HttpException('Provide a valid withdraw code', common_1.HttpStatus.FORBIDDEN);
            if (!user)
                throw new common_1.HttpException("User Doesn't exist", common_1.HttpStatus.BAD_REQUEST);
            if (Number(user.totalBalance) < Number(withdraw.amount))
                throw new common_1.HttpException('Insufficient funds', common_1.HttpStatus.FORBIDDEN);
            await this.withdrawService.deleteCode({
                withdrawalCode: withdraw.walletCode,
            });
            const withdrawal = await this.withdrawService.makeWithdrawal({
                asset: `${withdraw.asset}`,
                amount: Number(withdraw.amount),
                userId: `${withdraw.userId}`,
                walletAddress: `${withdraw.walletAddress}`,
            });
            await this.userService.updateUserInfo({ id: withdraw.userId }, {
                totalBalance: user.totalBalance - withdraw.amount,
            });
            return withdrawal;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WithdrawController.prototype, "getAllWithdrawals", null);
__decorate([
    (0, common_1.Get)('/my/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WithdrawController.prototype, "getMyWithdrawals", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WithdrawController.prototype, "makeWithdrawal", null);
WithdrawController = __decorate([
    (0, common_1.Controller)('withdraw'),
    __metadata("design:paramtypes", [withdraw_service_1.WithdrawService,
        user_service_1.UserService])
], WithdrawController);
exports.WithdrawController = WithdrawController;
//# sourceMappingURL=withdraw.controller.js.map