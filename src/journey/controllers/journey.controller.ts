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
    SerializeOptions,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ClassToPlain } from '@/core/types';
import { ReqUser } from '@/user/decorators';
import { UserEntity } from '@/user/entities';

import { CreateJourneyDto, QueryJourneyDto, UpdateJourneyDto } from '../dtos';

import { JourneyService, TagService } from '../services';

@ApiTags('日程模块')
@Controller('journey')
export class JourneyController {
    constructor(
        protected readonly tagService: TagService,
        protected readonly journeyService: JourneyService,
    ) {}

    @Get()
    @ApiOperation({ summary: '行程列表' })
    async list(@Query() data: QueryJourneyDto) {
        return this.journeyService.list(data);
    }

    @Get(':id')
    @ApiOperation({ summary: '行程明细' })
    @SerializeOptions({ groups: ['journey-detail'] })
    async detail(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.journeyService.detail(id);
    }

    @Post()
    @ApiOperation({ summary: '创建行程' })
    @SerializeOptions({ groups: ['journey-detail'] })
    async create(@ReqUser() user: ClassToPlain<UserEntity>, @Body() data: CreateJourneyDto) {
        return this.journeyService.create(user.id, data);
    }

    @Patch()
    @SerializeOptions({ groups: ['journey-detail'] })
    @ApiOperation({ summary: '编辑行程' })
    async update(@Body() data: UpdateJourneyDto) {
        return this.journeyService.update(data);
    }

    @Delete(':id')
    @ApiOperation({ summary: '删除行程' })
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.journeyService.delete(id);
    }
}
