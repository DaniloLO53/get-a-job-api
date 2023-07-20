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
const auth_guard_1 = require("../auth/auth.guard");
const role_decorator_1 = require("../auth/role.decorator");
const role_enum_1 = require("../auth/role.enum");
const job_dto_1 = require("./job.dto");
const job_service_1 = require("./job.service");
let JobController = exports.JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    async createJob(jobData, request) {
        return await this.jobService.createJob(jobData, request.userId);
    }
    async updateJob(jobData, request, jobId) {
        return await this.jobService.updateJob(jobData, request.userId, jobId);
    }
    async getJob(jobId) {
        return await this.jobService.getJob(jobId);
    }
    async createSchedule(scheduleData, request, jobId) {
        return await this.jobService.createSchedule(scheduleData, request.userId, jobId);
    }
    async getSchedules(jobId) {
        return await this.jobService.getSchedules(jobId);
    }
    async deleteSchedule(params, request) {
        return await this.jobService.deleteSchedule(params, request.userId);
    }
    async listJobs(queries) {
        const jobs = await this.jobService.listJobs(queries);
        this.lastJobInResults = jobs[2];
        return jobs;
    }
    async listJobsMore(queries) {
        const cursor = this.lastJobInResults;
        const jobs = await this.jobService.listJobsMore(queries, cursor);
        this.lastJobInResults = jobs[2];
        return jobs;
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Worker),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Put)('/:jobId'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Worker),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Get)('/:jobId'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Customer),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getJob", null);
__decorate([
    (0, common_1.Post)('/:jobId/schedules'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Worker),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.ScheduleDto, Object, String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Get)('/:jobId/schedules'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Customer),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getSchedules", null);
__decorate([
    (0, common_1.Delete)('/:jobId/schedules/:scheduleId'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Worker),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [job_dto_1.DeleteScheduleDto, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "deleteSchedule", null);
__decorate([
    (0, common_1.Get)('feed'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Customer),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "listJobs", null);
__decorate([
    (0, common_1.Get)('/feed/more'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Customer),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "listJobsMore", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
//# sourceMappingURL=job.controller.js.map