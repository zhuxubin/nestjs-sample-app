import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ClassToPlain } from '@/core/types';

import { ReqUser } from '../decorators';
import { UserEntity } from '../entities';

import { AuthService, UserService } from '../services';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
    constructor(
        protected readonly userService: UserService,
        protected readonly authService: AuthService,
    ) {}

    @Get('profile')
    @ApiOperation({ summary: '用户详情信息' })
    async profile(@ReqUser() user: ClassToPlain<UserEntity>) {
        return user;
    }
}
