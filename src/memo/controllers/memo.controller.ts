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
    @ApiOperation({ summary: '查找记录' })
    findAll(@ReqUser() user: ClassToPlain<UserEntity>, @Query() data: ListMemoDto) {
        return this.memoService.findAll(user.id, data);
    }

    @Post()
    @ApiOperation({ summary: '新增记录' })
    create(@ReqUser() user: ClassToPlain<UserEntity>, @Body() data: MemoDto) {
        return this.memoService.addMemo(user.id, data);
    }

    @Patch()
    @ApiOperation({ summary: '修改记录' })
    update(@Body() data: UpdateMemoDto) {
        return this.memoService.updateMemo(data);
    }

    @Get(':id')
    @ApiOperation({ summary: '获取记录' })
    findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.memoService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除记录' })
    remove(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.memoService.delMemo(id);
    }
}
