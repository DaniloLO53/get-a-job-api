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
exports.WorkerController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const role_decorator_1 = require("../auth/role.decorator");
const role_enum_1 = require("../auth/role.enum");
const worker_dto_1 = require("./worker.dto");
const worker_service_1 = require("./worker.service");
let WorkerController = exports.WorkerController = class WorkerController {
    constructor(workerService) {
        this.workerService = workerService;
    }
    async create(signUpData) {
        return await this.workerService.createProfile(signUpData);
    }
    async getWorker(workerId) {
        return 'Testing authenticaded route';
    }
};
__decorate([
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [worker_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], WorkerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/:workerId'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.Customer),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('workerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkerController.prototype, "getWorker", null);
exports.WorkerController = WorkerController = __decorate([
    (0, common_1.Controller)('workers'),
    __metadata("design:paramtypes", [worker_service_1.WorkerService])
], WorkerController);
//# sourceMappingURL=worker.controller.js.map