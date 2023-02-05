import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TagService } from '../services';

@ApiTags('日程模块')
@Controller('tags')
export class TagController {
    constructor(protected readonly tagService: TagService) {}

    @Get()
    @ApiOperation({ summary: '标签列表' })
    async list() {
        return this.tagService.list();
    }
}
