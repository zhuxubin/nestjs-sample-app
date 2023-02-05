import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginateDto {
    @Type(() => Number)
    @IsOptional({ always: true })
    @IsInt()
    @Min(1)
    @ApiProperty({ description: '第几页' })
    page?: number = 1;

    @Type(() => Number)
    @IsOptional({ always: true })
    @IsInt()
    @Min(1)
    @Max(100)
    @ApiProperty({ description: '每页显示数量' })
    pageSize?: number = 10;
}
