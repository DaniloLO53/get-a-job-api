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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma.service");
let JobService = exports.JobService = class JobService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createAgreement(params, customerId) {
        const { scheduleId, jobId } = params;
        const job = await this.prismaService.job.findUnique({
            where: {
                id: Number(jobId)
            }
        });
        const schedule = await this.prismaService.schedule.findUnique({
            where: {
                id: Number(scheduleId)
            }
        });
        const agreement = await this.prismaService.agreement.findUnique({
            where: {
                schedule_id: Number(scheduleId)
            }
        });
        if (!schedule || !job)
            throw new common_1.ConflictException({
                message: 'No job or schedule found'
            });
        if (agreement)
            throw new common_1.ConflictException({
                message: 'Schedule is already agreed'
            });
        return await this.prismaService.agreement.create({
            data: {
                schedule_id: Number(scheduleId),
                customer_id: customerId
            }
        });
    }
    async getAgreement(params, customerId) {
        const { scheduleId, jobId } = params;
        const job = await this.prismaService.job.findUnique({
            where: {
                id: Number(jobId)
            }
        });
        const schedule = await this.prismaService.schedule.findUnique({
            where: {
                id: Number(scheduleId)
            }
        });
        if (!schedule || !job)
            throw new common_1.ConflictException({
                message: 'No job or schedule or agreement found'
            });
        return await this.prismaService.agreement.findUnique({
            where: {
                schedule_id: Number(scheduleId)
            }
        });
    }
    async deleteAgreement(params, userId, roles) {
        const { jobId, scheduleId, agreementId } = params;
        const [role] = roles;
        const job = await this.prismaService.job.findUnique({
            where: {
                id: Number(jobId)
            }
        });
        const schedule = await this.prismaService.schedule.findUnique({
            where: {
                id: Number(scheduleId)
            }
        });
        const agreement = await this.prismaService.agreement.findUnique({
            where: {
                id: Number(agreementId)
            }
        });
        if (!schedule || !job || !agreement)
            throw new common_1.ConflictException({
                message: 'No job or schedule or agreement found'
            });
        if ((role === 'worker' && job.worker_id !== userId) ||
            (role === 'customer' && agreement.customer_id !== userId))
            throw new common_1.UnauthorizedException({
                message: 'Can only modify own content'
            });
        return await this.prismaService.agreement.delete({
            where: {
                id: Number(agreementId)
            }
        });
    }
    async deleteSchedule(params, workerId) {
        const { jobId, scheduleId } = params;
        const job = await this.prismaService.job.findUnique({
            where: {
                id: Number(jobId)
            }
        });
        const schedule = await this.prismaService.schedule.findUnique({
            where: {
                id: Number(scheduleId)
            }
        });
        if (!schedule || !job)
            throw new common_1.ConflictException({
                message: 'No job or schedule found'
            });
        if (job.worker_id !== workerId)
            throw new common_1.UnauthorizedException({
                message: 'Can only modify own content'
            });
        return await this.prismaService.schedule.delete({
            where: {
                id: Number(scheduleId)
            }
        });
    }
    async getSchedules(id) {
        return await this.prismaService.schedule.findMany({
            where: {
                job_id: Number(id)
            }
        });
    }
    async createSchedule(scheduleData, workerId, jobId) {
        const job = await this.prismaService.job.findUnique({ where: { id: Number(jobId) } });
        if (!job)
            throw new common_1.ConflictException({ message: 'No jobs found' });
        if (job.worker_id !== Number(workerId))
            throw new common_1.UnauthorizedException({
                message: 'Can only modify own content'
            });
        return await this.prismaService.schedule.create({
            data: {
                day: scheduleData.day,
                day_hour_start: scheduleData.day_hour_start,
                day_hour_end: scheduleData.day_hour_end,
                job_id: Number(jobId)
            }
        });
    }
    async createJob(jobData, workerId) {
        const { title, description, min_price, max_price } = jobData;
        return await this.prismaService.job.create({
            data: {
                title, description, max_price, min_price, worker_id: workerId
            }
        });
    }
    async updateJob(jobData, workerId, jobId) {
        const { title, description, min_price, max_price } = jobData;
        const job = await this.prismaService.job.findUnique({ where: { id: Number(jobId) } });
        if (!job)
            throw new common_1.ConflictException({ message: 'No jobs found' });
        if (job.worker_id !== Number(workerId))
            throw new common_1.UnauthorizedException({
                message: 'Can only modify own content'
            });
        return await this.prismaService.job.update({
            where: {
                id: Number(jobId)
            },
            data: {
                title, description, max_price, min_price, worker_id: workerId
            }
        });
    }
    async getJob(id) {
        return await this.prismaService.job.findUnique({
            where: { id: Number(id) },
            include: { worker: true, location_job: true }
        });
    }
    async listJobs(queries) {
        const { title, minRate, region, city, state } = queries;
        let where = {};
        if (minRate)
            where = { ...where, minRate };
        if (title)
            where = {
                ...where,
                title: { contains: title, mode: client_1.Prisma.QueryMode.insensitive },
            };
        if (state)
            where = {
                ...where,
                location_job: {
                    some: {
                        state: { contains: state, mode: client_1.Prisma.QueryMode.insensitive },
                    }
                }
            };
        return await this.prismaService.job.findMany({
            where,
            take: 3,
            include: {
                worker: true,
                location_job: true
            },
        });
    }
    async listJobsMore(queries, lastJobInResults) {
        let prismaOptions = {};
        const { title, minRate, region, city, state } = queries;
        let where = {};
        if (minRate)
            where = { ...where, minRate };
        if (title)
            where = {
                ...where,
                title: { contains: title, mode: client_1.Prisma.QueryMode.insensitive },
            };
        if (state)
            where = {
                ...where,
                location_job: {
                    some: {
                        state: { contains: state, mode: client_1.Prisma.QueryMode.insensitive },
                    }
                }
            };
        if (!lastJobInResults)
            throw new common_1.ConflictException({ message: 'No results at searching' });
        prismaOptions = {
            where,
            include: {
                worker: true,
                location_job: true,
            },
            take: 3,
            skip: 1,
            cursor: {
                id: lastJobInResults.id,
            },
        };
        return await this.prismaService.job.findMany(prismaOptions);
    }
    async searchJobs(queries, lastJobInResults) {
        const { searchQuery } = queries;
        let prismaOptions = {};
        const where = {
            OR: [
                {
                    title: { contains: searchQuery, mode: client_1.Prisma.QueryMode.insensitive },
                },
                {
                    location: {
                        contains: searchQuery,
                        mode: client_1.Prisma.QueryMode.insensitive,
                    },
                },
            ],
        };
        prismaOptions = {
            where,
            include: {
                job_provider: true,
                location_job: true,
            },
            take: 3,
        };
        return await this.prismaService.job.findMany(prismaOptions);
    }
};
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobService);
//# sourceMappingURL=job.service.js.map