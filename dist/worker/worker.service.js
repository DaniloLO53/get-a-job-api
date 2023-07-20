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
exports.WorkerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
const worker_helper_1 = require("./worker.helper");
let WorkerService = exports.WorkerService = class WorkerService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getProfileByEmail(email) {
        return await this.prismaService.worker.findUnique({ where: { email } });
    }
    async getWorkerById(workerId) {
        const result = await this.prismaService.worker.findUnique({
            where: {
                id: Number(workerId)
            },
            include: {
                jobs: {
                    include: {
                        schedules: true,
                        location_job: true,
                    }
                },
                rates: true,
            },
        });
        return (0, worker_helper_1.filterWorkerField)(result);
    }
    async rate(rateData, workerId, customerId) {
        const { rate, comment } = rateData;
        console.log('workderId', workerId);
        console.log('customerId', customerId);
        return await this.prismaService.rate.create({
            data: {
                rate, comment, worker_id: Number(workerId), customer_id: customerId
            },
        });
    }
    async deleteRate(customerId, params) {
        console.log(params);
        const { rateId } = params;
        const rate = await this.prismaService.rate.findUnique({
            where: {
                customer_id: customerId
            }
        });
        if (!rate)
            throw new common_1.ConflictException({
                message: 'Rate not found'
            });
        if (rate.customer_id !== customerId)
            throw new common_1.UnauthorizedException({
                message: 'Can only delete own rate'
            });
        return await this.prismaService.rate.delete({
            where: {
                id: Number(rateId)
            }
        });
    }
    async getRates(workerId) {
        return await this.prismaService.rate.findMany({ where: { worker_id: Number(workerId) } });
    }
    async updateMyProfile(workerId, updatedData) {
        const { email, first_name, last_name, nickname } = updatedData;
        return await this.prismaService.worker.update({
            where: {
                id: Number(workerId)
            },
            data: {
                email, first_name, last_name, nickname
            },
        });
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
exports.WorkerService = WorkerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkerService);
//# sourceMappingURL=worker.service.js.map