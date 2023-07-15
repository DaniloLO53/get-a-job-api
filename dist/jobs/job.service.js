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
    async listJobs(queries) {
        const { title, description, id } = queries;
        let where = {};
        if (title)
            where = {
                ...where,
                title: { contains: title, mode: client_1.Prisma.QueryMode.insensitive },
            };
        if (description)
            where = {
                ...where,
                description: {
                    contains: description,
                    mode: client_1.Prisma.QueryMode.insensitive,
                },
            };
        if (id)
            where = { ...where, id };
        return await this.prismaService.job.findMany({
            where,
            include: {
                company: true,
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
                company: true,
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
                company: true,
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