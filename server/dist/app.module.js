"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const admin_auth_module_1 = require("./admin-auth/admin-auth.module");
const deposit_module_1 = require("./deposit/deposit.module");
const investment_module_1 = require("./investment/investment.module");
const notification_module_1 = require("./notification/notification.module");
const support_module_1 = require("./support/support.module");
const trade_module_1 = require("./trade/trade.module");
const user_module_1 = require("./user/user.module");
const withdraw_module_1 = require("./withdraw/withdraw.module");
const prisma_service_1 = require("./prisma/prisma.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [admin_auth_module_1.AdminAuthModule, deposit_module_1.DepositModule, investment_module_1.InvestmentModule, notification_module_1.NotificationModule, support_module_1.SupportModule, trade_module_1.TradeModule, user_module_1.UserModule, withdraw_module_1.WithdrawModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map