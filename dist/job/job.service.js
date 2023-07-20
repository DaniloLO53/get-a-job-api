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
    async deleteSchedule(id) {
        return await this.prismaService.schedule.delete({
            where: {
                id: Number(id)
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
    async createSchedule(id, queries) {
        return await this.prismaService.schedule.create({
            data: {
                day: queries.day,
                day_hour_start: queries.day_hour_start,
                day_hour_end: queries.day_hour_end,
                job_id: Number(id)
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
            include: {
                worker: true,
                location_job: true
            },
        });
    }
    async searchJobsPagination(queries, lastJobInResults, direction) {
        const { title } = queries;
        let prismaOptions = {};
        const where = {
            title: { contains: title, mode: client_1.Prisma.QueryMode.insensitive },
        };
        if (!lastJobInResults)
            throw new common_1.ConflictException({ message: 'No results at searching' });
        prismaOptions = {
            where,
            include: {
                job_provider: true,
                location_job: true,
            },
            take: direction === 'forward' ? 7 : -7,
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
            take: 7,
        };
        return await this.prismaService.job.findMany(prismaOptions);
    }
};
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobService);
//# sourceMappingURL=job.service.js.map