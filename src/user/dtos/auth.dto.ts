import { PickType } from '@nestjs/swagger';

import { DtoValidation } from '@/core/decorators';

import { UserDtoGroups } from '../constants';

import { GuestDto } from './guest.dto';

// 用户正常方式登录
export class CredentialDto extends PickType(GuestDto, ['credential', 'password']) {}

// 普通方式注册用户
@DtoValidation({ groups: [UserDtoGroups.REGISTER] })
export class RegisterDto extends PickType(GuestDto, [
    'username',
    'nickname',
    'password',
    'plainPassword',
] as const) {}
