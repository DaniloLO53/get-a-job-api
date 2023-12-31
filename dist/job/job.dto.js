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
exports.DeleteAgreementDto = exports.DeleteScheduleDto = exports.ScheduleDto = void 0;
const class_validator_1 = require("class-validator");
const regexDay = /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const regexTime = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
class ScheduleDto {
}
exports.ScheduleDto = ScheduleDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(regexDay),
    __metadata("design:type", String)
], ScheduleDto.prototype, "day", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(regexTime),
    __metadata("design:type", String)
], ScheduleDto.prototype, "day_hour_start", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(regexTime),
    __metadata("design:type", String)
], ScheduleDto.prototype, "day_hour_end", void 0);
class DeleteScheduleDto {
}
exports.DeleteScheduleDto = DeleteScheduleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteScheduleDto.prototype, "jobId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteScheduleDto.prototype, "scheduleId", void 0);
class DeleteAgreementDto extends DeleteScheduleDto {
}
exports.DeleteAgreementDto = DeleteAgreementDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DeleteAgreementDto.prototype, "agreementId", void 0);
//# sourceMappingURL=job.dto.js.map