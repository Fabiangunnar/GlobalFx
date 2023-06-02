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
exports.DepositService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DepositService = class DepositService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createDeposit(data) {
        return this.prisma.depositHistory.create({
            data,
        });
    }
    verifyTransaction(where, data) {
        return this.prisma.depositHistory.update({
            where,
            data,
        });
    }
    getDepositHistory(where) {
        return this.prisma.depositHistory.findUnique({
            where,
        });
    }
    getAllDepositHistory() {
        return this.prisma.depositHistory.findMany();
    }
    getMyDepositHistory(where) {
        return this.prisma.depositHistory.findMany({
            where,
        });
    }
    deleteAllWhereUserId(where) {
        return this.prisma.depositHistory.deleteMany({
            where,
        });
    }
    addPendingDeposit(data) {
        return this.prisma.pendingDepositHistory.create({
            data,
        });
    }
    deletePendingDeposit(where) {
        return this.prisma.pendingDepositHistory.delete({
            where,
        });
    }
    deleteMyPendingDeposits(where) {
        return this.prisma.pendingDepositHistory.deleteMany({
            where,
        });
    }
    updatePendingDeposit(where, data) {
        return this.prisma.pendingDepositHistory.update({
            where,
            data,
        });
    }
    getAllPendingDeposits() {
        return this.prisma.pendingDepositHistory.findMany();
    }
    getMyPendingDeposits(where) {
        return this.prisma.pendingDepositHistory.findMany({
            where,
        });
    }
    getPendingDeposit(where) {
        return this.prisma.pendingDepositHistory.findUnique({
            where,
        });
    }
};
DepositService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DepositService);
exports.DepositService = DepositService;
//# sourceMappingURL=deposit.service.js.map