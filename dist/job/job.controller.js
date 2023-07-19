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
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const job_dto_1 = require("./job.dto");
const job_service_1 = require("./job.service");
let JobController = exports.JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    async deleteSchedule(params) {
        const { id, idSchedule } = params;
        return await this.jobService.deleteSchedule(id);
    }
    async createSchedule(queries, id) {
        return await this.jobService.createSchedule(id, queries);
    }
    async getSchedules(id) {
        return await this.jobService.getSchedules(id);
    }
    async getJob(id) {
        return await this.jobService.getJob(id);
    }
    async listServices(queries) {
        return await this.jobService.listJobs(queries);
    }
    async searchJobs(queries) {
        const jobs = await this.jobService.searchJobs(queries, this.lastJobInResults);
        this.lastJobInResults = jobs[6];
        this.firstJobInResults = jobs[0];
        return jobs;
    }
    async searchJobsPagination(queries, direction) {
        const formatedDirection = direction.slice(1);
        const cursor = formatedDirection === 'forward'
            ? this.lastJobInResults
            : this.firstJobInResults;
        const jobs = await this.jobService.searchJobsPagination(queries, cursor, formatedDirection);
        this.lastJobInResults = jobs[6];
        this.firstJobInResults = jobs[0];
        return jobs;
    }
};
__decorate([
    (0, common_1.Delete)('/:id/schedules/:idSchedule'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "deleteSchedule", null);
__decorate([
    (0, common_1.Post)('/:id/schedules'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.ScheduleDto, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Get)('/:id/schedules'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getSchedules", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJob", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "listServices", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "searchJobs", null);
__decorate([
    (0, common_1.Get)('search/pagination/:direction'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('direction')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "searchJobsPagination", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
//# sourceMappingURL=job.controller.js.map