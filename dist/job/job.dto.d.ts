export declare class ScheduleDto {
    day: string;
    day_hour_start: string;
    day_hour_end: string;
}
export declare class DeleteScheduleDto {
    jobId: string;
    scheduleId: string;
}
export declare class DeleteAgreementDto extends DeleteScheduleDto {
    agreementId: string;
}
