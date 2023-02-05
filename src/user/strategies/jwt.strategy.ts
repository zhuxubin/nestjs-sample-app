import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { instanceToPlain } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { userConfig } from '@/config';

import { UserRepository } from '../repositories';
import { JwtPayload } from '../types';

/**
 * 用户认证JWT策略
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: userConfig().jwt.secret,
        });
    }

    /**
     * 通过荷载解析出用户ID
     * 通过用户ID查询出用户是否存在,并把用户信息放入request方便后续操作
     */
    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.userRepository.findOneOrFail({ where: { id: payload.sub } });
        return instanceToPlain(user);
    }
}
