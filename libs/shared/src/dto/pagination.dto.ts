import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @Min(0)
    @Type(() =>  Number)
    @IsNumber({ allowNaN: false, allowInfinity: false})
    offset = 0;

    @IsOptional()
    @Type(() =>  Number)
    @IsNumber({ allowNaN: false, allowInfinity: false})
    @IsPositive()
    limit = 15;
}