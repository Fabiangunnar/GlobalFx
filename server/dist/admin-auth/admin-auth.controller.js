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
let AdminAuthController = class AdminAuthController {
    constructor(adminAuthService) {
        this.adminAuthService = adminAuthService;
    }
    async createUser(user) {
        const { username, password } = user;
        if (!username || !password)
            throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
        const data = await this.adminAuthService.createAdmin({
            username: user.username,
            password: user.password,
        });
        return data;
    }
    async loginUser(user) {
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
    async createCode() {
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
    async getUser(id) {
        const data = await this.adminAuthService.getUser({
            id,
        });
        return data;
    }
    async updateAdmin(user, id) {
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
    async getAdminArray() {
        const data = await this.adminAuthService.getAdminArray();
        const newData = await data.map((admin) => {
            delete admin.password;
            delete admin.username, delete admin.id;
            return admin;
        });
        return newData;
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
AdminAuthController = __decorate([
    (0, common_1.Controller)('admin-auth'),
    __metadata("design:paramtypes", [admin_auth_service_1.AdminAuthService])
], AdminAuthController);
exports.AdminAuthController = AdminAuthController;
//# sourceMappingURL=admin-auth.controller.js.map