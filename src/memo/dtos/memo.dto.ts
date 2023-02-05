import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, Length } from 'class-validator';

import { PaginateDto } from '@/core/dtos';

export class MemoDto {
    @Length(6, 50, { always: true, message: '标题长度不小于为$constraint1' })
    @ApiProperty({ description: '标题' })
    title!: string;
}

// 查询列表
export class ListMemoDto extends PaginateDto {}

// 删除
export class DelMemoDto {
    @IsUUID(undefined, { message: 'ID格式错误' })
    @IsOptional({ always: true })
    @ApiProperty({ description: 'ID序号' })
    id!: string;
}

// 修改
export class UpdateMemoDto {
    @IsUUID(undefined, { message: 'ID格式错误' })
    @IsOptional({ always: true })
    @ApiProperty({ description: 'ID序号' })
    id!: string;

    @IsOptional({ always: true })
    status!: boolean;
}
