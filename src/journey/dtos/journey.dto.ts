import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsOptional, IsUUID, MaxLength } from 'class-validator';

import { DtoValidation } from '@/core/decorators';
import { PaginateDto } from '@/core/dtos';

// 列表查询验证
export class QueryJourneyDto extends PaginateDto {}

// 创建数据验证
@DtoValidation({ groups: ['create'] })
export class CreateJourneyDto {
    @MaxLength(255, {
        always: true,
        message: '标题长度最大为$constraint1',
    })
    @IsNotEmpty({ groups: ['create'], message: '标题必须填写' })
    @IsOptional({ groups: ['update'] })
    @ApiProperty({ description: '标题' })
    title!: string;

    @IsNotEmpty({ groups: ['create'], message: '内容必须填写' })
    @IsOptional({ groups: ['update'] })
    @ApiProperty({ description: '内容' })
    content!: string;

    @IsUUID(undefined, {
        each: true,
        always: true,
        message: '标签ID格式不正确',
    })
    @IsOptional({ always: true })
    @ApiProperty({ description: '标签的uuid' })
    tags?: string[];
}

@DtoValidation({ groups: ['update'] })
export class UpdateJourneyDto extends PartialType(CreateJourneyDto) {
    @IsUUID(undefined, { groups: ['update'], message: '文章ID格式错误' })
    @IsDefined({ groups: ['update'], message: '文章ID必须指定' })
    @ApiProperty({ description: '行程的序号ID' })
    id!: string;
}
