import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ClassToPlain } from '@/core/types';

import { Guest, ReqUser } from '../decorators';

import { RegisterDto } from '../dtos/auth.dto';
import { UserEntity } from '../entities';
import { LocalAuthGuard } from '../guards';
import { AuthService, UserService } from '../services';

@ApiTags('账号模块')
@Controller('account')
export class AuthController {
    constructor(
        protected readonly userService: UserService,
        protected readonly authService: AuthService,
    ) {}

    @Post('login')
    @ApiOperation({ summary: '凭证和密码登录' })
    @Guest()
    @UseGuards(LocalAuthGuard)
    async login(@ReqUser() user: ClassToPlain<UserEntity>) {
        return this.authService.createToken(user.id);
    }

    @Post('register')
    @ApiOperation({ summary: '账号密码登录' })
    @Guest()
    async register(@Body() data: RegisterDto) {
        return this.authService.register(data);
    }
}
