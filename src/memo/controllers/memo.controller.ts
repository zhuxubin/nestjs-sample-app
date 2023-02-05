import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ClassToPlain } from '@/core/types';
import { ReqUser } from '@/user/decorators';

import { UserEntity } from '@/user/entities';

import { ListMemoDto, MemoDto, UpdateMemoDto } from '../dtos/memo.dto';

import { MemoService } from '../services';

@Controller('memo')
@ApiTags('备忘录')
export class MemoController {
    constructor(protected readonly memoService: MemoService) {}

    @Get()
    @ApiOperation({ summary: '记录列表' })
    list(@ReqUser() user: ClassToPlain<UserEntity>, @Query() data: ListMemoDto) {
        return this.memoService.list(user.id, data);
    }

    @Post()
    @ApiOperation({ summary: '新增记录' })
    create(@ReqUser() user: ClassToPlain<UserEntity>, @Body() data: MemoDto) {
        return this.memoService.create(user.id, data);
    }

    @Patch()
    @ApiOperation({ summary: '修改记录' })
    update(@Body() data: UpdateMemoDto) {
        return this.memoService.update(data);
    }

    @Get(':id')
    @ApiOperation({ summary: '获取记录' })
    detail(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.memoService.detail(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除记录' })
    delete(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.memoService.delete(id);
    }
}
