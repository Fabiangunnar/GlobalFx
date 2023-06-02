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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const support_service_1 = require("../support/support.service");
const notification_service_1 = require("../notification/notification.service");
const deposit_service_1 = require("../deposit/deposit.service");
const investment_service_1 = require("../investment/investment.service");
const trade_service_1 = require("../trade/trade.service");
const withdraw_service_1 = require("../withdraw/withdraw.service");
let UserController = class UserController {
    constructor(userService, supportService, notificationService, depositService, investmentService, tradesService, withdrawService) {
        this.userService = userService;
        this.supportService = supportService;
        this.notificationService = notificationService;
        this.depositService = depositService;
        this.investmentService = investmentService;
        this.tradesService = tradesService;
        this.withdrawService = withdrawService;
    }
    async createUser(user) {
        try {
            const { firstname, lastname, email, password, confirmPassword } = user;
            if (!firstname || !lastname || !email || !password)
                throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
            const data = await this.userService.getUser({
                email: email.toLowerCase(),
            });
            if (data)
                throw new common_1.HttpException('user already registered', common_1.HttpStatus.NOT_FOUND);
            if (JSON.stringify(password) !== JSON.stringify(confirmPassword)) {
                throw new common_1.HttpException('Incorrect Password', common_1.HttpStatus.BAD_REQUEST);
            }
            delete user.confirmPassword;
            return await this.userService.createUser({
                firstname,
                lastname,
                email: email.toLowerCase(),
                password,
            });
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async loginUser(user) {
        const { email, password } = user;
        if (!email || !password)
            throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
        delete user.confirmPassword;
        const data = await this.userService.getUser({
            email: `${email.toLowerCase()}`,
        });
        if (!data)
            throw new common_1.HttpException("User Doesn't exist", common_1.HttpStatus.NOT_FOUND);
        await this.userService.updateUserInfo({ email }, {
            lastLogin: new Date(),
        });
        return data;
    }
    getAllUsers() {
        return this.userService.getAllUsers();
    }
    async getAllKYCDocuments() {
        const users = await this.userService.getAllUsers();
        const kycDocuments = await this.userService.getAllKycDocuments();
        return kycDocuments.map((item) => {
            const match = users.find((user) => user.id === item.userId);
            const { firstname, lastname } = match;
            return match ? Object.assign(Object.assign({}, item), { firstname, lastname }) : null;
        });
    }
    async getMyKycDocuments(userId) {
        try {
            if (!userId)
                throw new common_1.HttpException("Document Doesn't exist", common_1.HttpStatus.NOT_FOUND);
            return this.userService.getMyKycDocuments({
                userId,
            });
        }
        catch (error) {
            throw new common_1.HttpException('Something terribly wrong', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUser(id) {
        if (!id)
            throw new common_1.HttpException("User Doesn't exist", common_1.HttpStatus.NOT_FOUND);
        return this.userService.getUser({ id });
    }
    async updateUserAccountInfo(accountInfo, id) {
        try {
            const { totalBalance, totalProfit } = accountInfo;
            if ((!totalProfit || Number(totalProfit) === 0) &&
                (!totalBalance || Number(totalBalance) === 0)) {
                throw new common_1.HttpException(`Input not right`, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!totalProfit || (Number(totalProfit) === 0 && totalBalance)) {
                return await this.userService.updateUserInfo({ id }, {
                    totalBalance: Number(totalBalance),
                });
            }
            else if (!totalBalance || (Number(totalBalance) === 0 && totalProfit)) {
                return await this.userService.updateUserInfo({ id }, {
                    totalProfit: Number(totalProfit),
                });
            }
            else {
                return await this.userService.updateUserInfo({ id }, {
                    totalBalance: Number(totalBalance),
                    totalProfit: Number(totalProfit),
                });
            }
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateProfilePicture(profilePictureInfo, id) {
        if (!profilePictureInfo.picture) {
            throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.userService.updateUserInfo({ id }, {
            picture: `${profilePictureInfo.picture}`,
        });
    }
    async updatePhoneNumber(phoneNumberInfo, id) {
        if (!phoneNumberInfo.phoneNumber) {
            throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.userService.updateUserInfo({ id }, {
            phoneNumber: `${phoneNumberInfo.phoneNumber}`,
        });
    }
    async verifyUser(accountState, id) {
        try {
            if (accountState.accountState === 'PENDING') {
                return this.userService.updateUserInfo({ id }, { accountState: accountState.accountState });
            }
            if (accountState.accountState === 'VERIFIED') {
                return this.userService.updateUserInfo({ id }, { accountState: accountState.accountState });
            }
            if (accountState.accountState === 'BLOCKED') {
                return this.userService.updateUserInfo({ id }, { accountState: accountState.accountState });
            }
            return new common_1.HttpException('cannot change', common_1.HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async verifykycDoc(kycStatus, id) {
        try {
            if (kycStatus.status !== 'VERIFIED' ||
                kycStatus.status !== 'PENDING' ||
                kycStatus.status !== 'NOT_VERIFIED')
                throw new common_1.HttpException('Wrong Data', common_1.HttpStatus.BAD_REQUEST);
            return this.userService.updateKycStatus({ id }, { status: kycStatus.status });
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async kycVerify(kycVer, id) {
        try {
            if (!kycVer.idDocuments || !kycVer.proofOfAddress) {
                throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
            }
            const kyc = this.userService.getMyKycDocuments({
                userId: id,
            });
            if (kyc.length > 0)
                throw new common_1.HttpException(`You have already given your documents, `, common_1.HttpStatus.NOT_ACCEPTABLE);
            return this.userService.verifyKyc({
                userId: id,
                idDocuments: `${kycVer.idDocuments}`,
                proofOfAddress: `${kycVer.proofOfAddress}`,
            });
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.userService.getUser({ id });
            await this.depositService.deleteAllWhereUserId({ userId: user.id });
            await this.depositService.deleteMyPendingDeposits({ userId: user.id });
            await this.notificationService.deleteAllWhereUserId({ userId: user.id });
            await this.supportService.deleteAllWhereUserId({ userId: user.id });
            await this.withdrawService.deleteMyWithdrawals({ userId: user.id });
            await this.investmentService.deleteInvestmentHistory({ userId: id });
            await this.tradesService.deleteMyTrades({ userId: id });
            await this.userService.deleteKycStatus({ userId: id });
            return this.userService.deleteUser({ id });
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/kyc/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllKYCDocuments", null);
__decorate([
    (0, common_1.Get)('/kyc/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyKycDocuments", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)('/account/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserAccountInfo", null);
__decorate([
    (0, common_1.Put)('/picture/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfilePicture", null);
__decorate([
    (0, common_1.Put)('/phone/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePhoneNumber", null);
__decorate([
    (0, common_1.Put)('/verifyuser/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.Put)('/kycverify/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifykycDoc", null);
__decorate([
    (0, common_1.Put)('/kyc/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "kycVerify", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        support_service_1.SupportService,
        notification_service_1.NotificationService,
        deposit_service_1.DepositService,
        investment_service_1.InvestmentService,
        trade_service_1.TradeService,
        withdraw_service_1.WithdrawService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map