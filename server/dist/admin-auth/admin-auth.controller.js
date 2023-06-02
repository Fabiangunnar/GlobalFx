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
exports.AdminAuthController = void 0;
const common_1 = require("@nestjs/common");
const admin_auth_service_1 = require("./admin-auth.service");
const uuid_1 = require("uuid");
const user_service_1 = require("../user/user.service");
let AdminAuthController = class AdminAuthController {
    constructor(adminAuthService, userService) {
        this.adminAuthService = adminAuthService;
        this.userService = userService;
    }
    async createUser(user) {
        try {
            const { username, password } = user;
            if (!username || !password)
                throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
            const data = await this.adminAuthService.createAdmin({
                username: user.username,
                password: user.password,
            });
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async loginUser(user) {
        try {
            const data = await this.adminAuthService.getUser({
                username: user.username,
            });
            if (!data)
                throw new common_1.HttpException('user not found', common_1.HttpStatus.NOT_FOUND);
            const isMatch = user.password === data.password;
            if (!isMatch)
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.BAD_REQUEST);
            return data;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createCode() {
        try {
            const uuid = (0, uuid_1.v4)();
            const timeoutDuration = 3 * 60 * 60 * 1000 + 1 * 60 * 1000;
            const code = await this.adminAuthService.createCode({
                withdrawalCode: uuid,
            });
            setTimeout(async () => {
                await this.adminAuthService.deleteCode({
                    withdrawalCode: uuid,
                });
            }, timeoutDuration);
            return code;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUser(id) {
        try {
            const data = await this.adminAuthService.getUser({
                id,
            });
            return data;
        }
        catch (error) {
            throw new common_1.HttpException('Something terribly wrong', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateAdmin(user, id) {
        if (!id)
            throw new common_1.HttpException('Logout and login again', common_1.HttpStatus.FORBIDDEN);
        try {
            const data = await this.adminAuthService.getUser({
                username: user.username,
            });
            if (!data)
                throw new common_1.HttpException('Your Username is wrong', common_1.HttpStatus.NOT_FOUND);
            const app = await this.adminAuthService.updateAdmin({ id }, {
                username: user.username,
                password: user.password,
                btc: user.btc,
                eth: user.eth,
                usdt: user.usdt,
                email: user.email,
                phone: user.phone,
            });
            return app;
        }
        catch (error) {
            throw new common_1.HttpException(`Something terribly wrong \n ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAdminArray() {
        try {
            const data = await this.adminAuthService.getAdminArray();
            const newData = await data.map((admin) => {
                delete admin.password;
                delete admin.username, delete admin.id;
                return admin;
            });
            return newData;
        }
        catch (error) {
            throw new common_1.HttpException(`${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createDeposit(deposit) {
        try {
            if (!deposit.amount || !deposit.userId || deposit.amount === 0)
                throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
            const user = await this.userService.getUser({ id: deposit.userId });
            const depo = await this.adminAuthService.createDeposit({
                asset: `BTC`,
                amount: Number(deposit.amount),
                userId: `${deposit.userId}`,
                to: 'admin',
                transactionState: 'VERIFIED',
            });
            await this.userService.updateUserInfo({ id: deposit.userId }, {
                totalDeposit: depo.amount + user.totalDeposit,
                totalBalance: depo.amount + user.totalBalance,
            });
            return depo;
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
], AdminAuthController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "loginUser", null);
__decorate([
    (0, common_1.Get)('/code'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "createCode", null);
__decorate([
    (0, common_1.Get)('/my/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)('/info/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "getAdminArray", null);
__decorate([
    (0, common_1.Post)('/user/deposit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminAuthController.prototype, "createDeposit", null);
AdminAuthController = __decorate([
    (0, common_1.Controller)('admin-auth'),
    __metadata("design:paramtypes", [admin_auth_service_1.AdminAuthService,
        user_service_1.UserService])
], AdminAuthController);
exports.AdminAuthController = AdminAuthController;
//# sourceMappingURL=admin-auth.controller.js.map