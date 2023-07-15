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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let UserService = exports.UserService = class UserService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getProfileByEmail(email) {
        return await this.prismaService.user.findUnique({ where: { email } });
    }
    async createProfileByOauth(signUpData) {
        const { email } = signUpData;
        const emailWithTypeInfered = email;
        const userAlreadyRegistered = await this.getProfileByEmail(email);
        if (userAlreadyRegistered)
            throw new common_1.ConflictException({
                message: 'User already registered with given email',
            });
        return await this.prismaService.user.create({
            data: {
                email: emailWithTypeInfered,
            },
        });
    }
    async createProfile(signUpData) {
        const { password, confirmPassword, email } = signUpData;
        const emailWithTypeInfered = email;
        const userAlreadyRegistered = await this.getProfileByEmail(email);
        if (userAlreadyRegistered)
            throw new common_1.ConflictException({
                message: 'User already registered with given email',
            });
        if (password !== confirmPassword)
            throw new common_1.ConflictException({
                message: 'Confirm passoword does not match',
            });
        const hashedPassword = await bcrypt.hash(password, 10);
        return await this.prismaService.user.create({
            data: {
                email: emailWithTypeInfered,
                password: hashedPassword,
            },
        });
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map