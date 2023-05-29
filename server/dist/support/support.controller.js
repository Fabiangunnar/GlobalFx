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
exports.SupportController = void 0;
const common_1 = require("@nestjs/common");
const support_service_1 = require("./support.service");
const user_service_1 = require("../user/user.service");
let SupportController = class SupportController {
    constructor(supportTicketService, userService) {
        this.supportTicketService = supportTicketService;
        this.userService = userService;
    }
    async supportTicket(supportticket) {
        if (!supportticket.subject ||
            !supportticket.message ||
            !supportticket.userId)
            throw new common_1.HttpException('Input field not complete', common_1.HttpStatus.BAD_REQUEST);
        const data = await this.userService.getUser({ id: supportticket.userId });
        if (!data)
            throw new common_1.HttpException("User Doesn't exist", common_1.HttpStatus.BAD_REQUEST);
        return this.supportTicketService.createSupportTicket({
            subject: `${supportticket.subject}`,
            message: `${supportticket.message}`,
            userId: `${supportticket.userId}`,
        });
    }
    async getAllUsers() {
        return this.supportTicketService.getAllSupportTickets();
    }
    async getMySupportTickets(userId) {
        return this.supportTicketService.getMySupportTickets({ userId });
    }
};
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "supportTicket", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportController.prototype, "getMySupportTickets", null);
SupportController = __decorate([
    (0, common_1.Controller)('support'),
    __metadata("design:paramtypes", [support_service_1.SupportService,
        user_service_1.UserService])
], SupportController);
exports.SupportController = SupportController;
//# sourceMappingURL=support.controller.js.map