import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ClassToPlain } from '@/core/types';

import { UserEntity } from '../entities';

// 获取当前用户装饰器
export const ReqUser = createParamDecorator(async (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as ClassToPlain<UserEntity>;
});
