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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithdrawService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WithdrawService = class WithdrawService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    makeWithdrawal(data) {
        return this.prisma.withdrawalHistory.create({
            data,
        });
    }
    getAllWithdrawals() {
        return this.prisma.withdrawalHistory.findMany();
    }
    deleteMyWithdrawals(where) {
        return this.prisma.withdrawalHistory.deleteMany({
            where,
        });
    }
    getMyWithdrawals(where) {
        return this.prisma.withdrawalHistory.findMany({
            where,
        });
    }
    getWalletCode(where) {
        return this.prisma.withdrawalCode.findUnique({
            where,
        });
    }
    deleteCode(where) {
        return this.prisma.withdrawalCode.delete({
            where,
        });
    }
};
WithdrawService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WithdrawService);
exports.WithdrawService = WithdrawService;
//# sourceMappingURL=withdraw.service.js.map