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
exports.AgreementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let AgreementService = exports.AgreementService = class AgreementService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getProfileByEmail(email) {
        return await this.prismaService.worker.findUnique({ where: { email } });
    }
    async createProfile(signUpData) {
        const { password, confirmPassword, email, nickname } = signUpData;
        const emailWithTypeInfered = email;
        const workerAlreadyRegistered = await this.getProfileByEmail(email);
        if (workerAlreadyRegistered)
            throw new common_1.ConflictException({
                message: 'user already registered with given email',
            });
        if (password !== confirmPassword)
            throw new common_1.ConflictException({
                message: 'Confirm passoword does not match',
            });
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.prismaService.worker.create({
            data: {
                nickname,
                email: emailWithTypeInfered,
                password: hashedPassword,
            },
        });
    }
};
exports.AgreementService = AgreementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AgreementService);
//# sourceMappingURL=agreement.service.js.map