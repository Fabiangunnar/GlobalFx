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
exports.InvestmentController = void 0;
const common_1 = require("@nestjs/common");
const investment_service_1 = require("./investment.service");
const user_service_1 = require("../user/user.service");
let InvestmentController = class InvestmentController {
    constructor(investmentService, userService) {
        this.investmentService = investmentService;
        this.userService = userService;
    }
    async makeInvestment(investDto) {
        try {
            if (!investDto.amount || !investDto.plan || !investDto.userId)
                throw new common_1.HttpException('Input fields incomplete', common_1.HttpStatus.BAD_REQUEST);
            if (investDto.plan !== 'BASIC' &&
                investDto.plan !== 'STANDARD' &&
                investDto.plan !== 'LUXURY')
                throw new common_1.HttpException('Wrong investment plan', common_1.HttpStatus.BAD_REQUEST);
            if (investDto.plan === 'BASIC') {
                if (Number(investDto.amount) < 500 || Number(investDto.amount) > 4500) {
                    throw new common_1.HttpException('Select within the required amount for this plan', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (investDto.plan === 'STANDARD') {
                if (Number(investDto.amount) < 5000 ||
                    Number(investDto.amount) > 14000) {
                    throw new common_1.HttpException('Select within the required amount for this plan', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            if (investDto.plan === 'LUXURY') {
                if (Number(investDto.amount) < 15000 ||
                    Number(investDto.amount) > 60000) {
                    throw new common_1.HttpException('Select within the required amount for this plan', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            const user = await this.userService.getUser({ id: investDto.userId });
            if (!user)
                throw new common_1.HttpException("User doesn't exist", common_1.HttpStatus.BAD_REQUEST);
            if (user.totalBalance < investDto.amount)
                throw new common_1.HttpException('Insufficient funds for this transaction', common_1.HttpStatus.FORBIDDEN);
            const investData = await this.investmentService.makeInvestment({
                amount: Number(investDto.amount),
                plan: investDto.plan,
                userId: investDto.userId,
            });
            await this.userService.updateUserInfo({
                id: investDto.userId,
            }, {
                totalBalance: Number(user.totalBalance) - Number(investDto.amount),
            });
            return investData;
        }
        catch (error) {
            throw new common_1.HttpException(error.response, error.status);
        }
    }
    async getAllInvestments() {
        try {
            const investments = await this.investmentService.getAllInvestments();
            const users = await this.userService.getAllUsers();
            const newInvestments = investments.map((investment) => {
                const { firstname, lastname } = users.find((user) => user.id === investment.userId);
                return Object.assign(Object.assign({}, investment), { firstname,
                    lastname });
            });
            return newInvestments;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getMyInvestments(userId) {
        return await this.investmentService.getMyInvestments({ userId });
    }
    async updateInvestmentStatus(id, investDto) {
        try {
            if (investDto.status !== 'PENDING' &&
                investDto.status !== 'VERIFIED' &&
                investDto.status !== 'NOT_VERIFIED')
                throw new common_1.HttpException(`Can't set the status to ${investDto.status}`, common_1.HttpStatus.BAD_REQUEST);
            return this.investmentService.updateInvestmentStatus({ id }, { status: investDto.status });
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "makeInvestment", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "getAllInvestments", null);
__decorate([
    (0, common_1.Get)('/my/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "getMyInvestments", null);
__decorate([
    (0, common_1.Put)('/admin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "updateInvestmentStatus", null);
InvestmentController = __decorate([
    (0, common_1.Controller)('investment'),
    __metadata("design:paramtypes", [investment_service_1.InvestmentService,
        user_service_1.UserService])
], InvestmentController);
exports.InvestmentController = InvestmentController;
//# sourceMappingURL=investment.controller.js.map