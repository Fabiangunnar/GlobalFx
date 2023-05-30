"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthModule = void 0;
const common_1 = require("@nestjs/common");
const admin_auth_service_1 = require("./admin-auth.service");
const admin_auth_controller_1 = require("./admin-auth.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
let AdminAuthModule = class AdminAuthModule {
};
AdminAuthModule = __decorate([
    (0, common_1.Module)({
        providers: [admin_auth_service_1.AdminAuthService, prisma_service_1.PrismaService, user_service_1.UserService],
        controllers: [admin_auth_controller_1.AdminAuthController],
    })
], AdminAuthModule);
exports.AdminAuthModule = AdminAuthModule;
//# sourceMappingURL=admin-auth.module.js.map