import { IsNotEmpty, IsEmail, MinLength, Matches } from 'class-validator';

const regexDay = /^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const regexTime = /^(?:[01]\d|2[0-3]):[0-5]\d$/;


export class ScheduleDto {
  @IsNotEmpty()
  @Matches(regexDay)
  day: string;

  @IsNotEmpty()
  @Matches(regexTime)
  day_hour_start: string;

  @IsNotEmpty()
  @Matches(regexTime)
  day_hour_end: string;
}
