import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { isNil } from 'lodash';
import { ExtractJwt } from 'passport-jwt';

import { ALLOW_GUEST } from '@/core/constants';

/**
 * 用户JWT认证守卫
 * 检测用户是否已登录
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const crudGuest = Reflect.getMetadata(
            ALLOW_GUEST,
            context.getClass().prototype,
            context.getHandler().name,
        );
        const defaultGuest = this.reflector.getAllAndOverride<boolean>(ALLOW_GUEST, [
            context.getHandler(),
            context.getClass(),
        ]);
        const allowGuest = crudGuest ?? defaultGuest;
        if (allowGuest) return true;

        const request = context.switchToHttp().getRequest();

        // 从请求头中获取token，如果请求头不含有authorization字段则认证失败
        const requestToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        if (isNil(requestToken)) return false;

        return (await super.canActivate(context)) as boolean;
    }
}
