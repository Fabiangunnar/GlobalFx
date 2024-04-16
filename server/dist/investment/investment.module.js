"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentModule = void 0;
const common_1 = require("@nestjs/common");
const investment_controller_1 = require("./investment.controller");
const investment_service_1 = require("./investment.service");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
let InvestmentModule = class InvestmentModule {
};
exports.InvestmentModule = InvestmentModule;
exports.InvestmentModule = InvestmentModule = __decorate([
    (0, common_1.Module)({
        controllers: [investment_controller_1.InvestmentController],
        providers: [investment_service_1.InvestmentService, prisma_service_1.PrismaService, user_service_1.UserService],
    })
], InvestmentModule);
//# sourceMappingURL=investment.module.js.map