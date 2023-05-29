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
exports.InvestmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InvestmentService = class InvestmentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    makeInvestment(data) {
        return this.prisma.investmentHistory.create({
            data,
        });
    }
    getAllInvestments() {
        return this.prisma.investmentHistory.findMany();
    }
    getMyInvestments(where) {
        return this.prisma.investmentHistory.findMany({
            where,
        });
    }
    updateInvestmentStatus(where, data) {
        return this.prisma.investmentHistory.update({
            where,
            data,
        });
    }
    deleteInvestmentHistory(where) {
        return this.prisma.investmentHistory.deleteMany({
            where,
        });
    }
};
InvestmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvestmentService);
exports.InvestmentService = InvestmentService;
//# sourceMappingURL=investment.service.js.map