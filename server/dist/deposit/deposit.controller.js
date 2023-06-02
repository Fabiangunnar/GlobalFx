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
exports.DepositController = void 0;
const common_1 = require("@nestjs/common");
const deposit_service_1 = require("./deposit.service");
const user_service_1 = require("../user/user.service");
let DepositController = class DepositController {
    constructor(depositService, userService) {
        this.depositService = depositService;
        this.userService = userService;
    }
    async createDeposit(deposit) {
        try {
            if (!deposit.asset || !deposit.amount || !deposit.userId || !deposit.to)
                throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
            const user = await this.userService.getUser({ id: deposit.userId });
            if (!user)
                throw new common_1.HttpException("User Doesn't exist", common_1.HttpStatus.BAD_REQUEST);
            const depositData = await this.depositService.createDeposit({
                asset: `${deposit.asset}`,
                amount: Number(deposit.amount),
                userId: `${deposit.userId}`,
                to: `${deposit.to}`,
            });
            if (depositData) {
                await this.depositService.addPendingDeposit({
                    amount: Number(deposit.amount),
                    userId: `${deposit.userId}`,
                    depositId: `${depositData.id}`,
                });
            }
            return depositData;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAllDepositHistory() {
        try {
            const allDeposits = await this.depositService.getAllDepositHistory();
            const users = await this.userService.getAllUsers();
            const newDeposits = allDeposits.map((depositHistory) => {
                const { firstname, lastname } = users.find((user) => user.id === depositHistory.userId);
                return Object.assign(Object.assign({}, depositHistory), { firstname, lastname });
            });
            return newDeposits;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getMyDepositHistory(userId) {
        try {
            if (!userId)
                throw new common_1.HttpException('No User Specified', common_1.HttpStatus.BAD_REQUEST);
            return this.depositService.getMyDepositHistory({ userId });
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getMyPendingDeposits(userId) {
        try {
            if (!userId)
                throw new common_1.HttpException('No User Specified', common_1.HttpStatus.BAD_REQUEST);
            return this.depositService.getMyPendingDeposits({ userId });
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifyTransaction(deposit, id) {
        try {
            const depositState = await this.depositService.getDepositHistory({ id });
            const user = await this.userService.getUser({ id: depositState.userId });
            const pendingDeposit = await this.depositService.getPendingDeposit({
                depositId: depositState.id,
            });
            if (depositState.transactionState !== 'PENDING')
                throw new common_1.HttpException('client required to make a new Deposit', common_1.HttpStatus.FORBIDDEN);
            if (deposit.transactionState === 'PENDING') {
                return this.depositService.verifyTransaction({ id }, { transactionState: deposit.transactionState });
            }
            if (deposit.transactionState === 'VERIFIED') {
                await this.userService.updateUserInfo({ id: depositState.userId }, {
                    totalDeposit: pendingDeposit.amount + user.totalDeposit,
                    totalBalance: pendingDeposit.amount + user.totalBalance,
                });
                await this.depositService.deletePendingDeposit({
                    depositId: depositState.id,
                });
                return this.depositService.verifyTransaction({ id }, { transactionState: deposit.transactionState });
            }
            if (deposit.transactionState === 'NOT_VERIFIED') {
                await this.depositService.deletePendingDeposit({
                    depositId: depositState.id,
                });
                return this.depositService.verifyTransaction({ id }, { transactionState: deposit.transactionState });
            }
            return new common_1.HttpException('cannot change', common_1.HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateDeposit(deposit, id) {
        try {
            const depositState = await this.depositService.getDepositHistory({ id });
            const pendingDeposit = await this.depositService.getPendingDeposit({
                depositId: depositState.id,
            });
            if (pendingDeposit) {
                await this.depositService.updatePendingDeposit({
                    depositId: depositState.id,
                }, {
                    amount: Number(deposit.amount),
                });
            }
            return this.depositService.verifyTransaction({ id }, { amount: Number(deposit.amount) });
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "createDeposit", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getAllDepositHistory", null);
__decorate([
    (0, common_1.Get)('/all/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getMyDepositHistory", null);
__decorate([
    (0, common_1.Get)('/pending/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "getMyPendingDeposits", null);
__decorate([
    (0, common_1.Put)('/verifytransaction/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "verifyTransaction", null);
__decorate([
    (0, common_1.Put)('/mydeposit/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DepositController.prototype, "updateDeposit", null);
DepositController = __decorate([
    (0, common_1.Controller)('deposit'),
    __metadata("design:paramtypes", [deposit_service_1.DepositService,
        user_service_1.UserService])
], DepositController);
exports.DepositController = DepositController;
//# sourceMappingURL=deposit.controller.js.map