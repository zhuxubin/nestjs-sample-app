import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserEntity } from '../entities';

import { decrypt, encrypt } from '../helpers';

import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(private readonly tokenService: TokenService, private userService: UserService) {}

    // 使用用户名密码注册用户
    async register(data: any) {
        const { username, nickname, password } = data;
        const user = new UserEntity();
        user.username = username;
        user.password = encrypt(password);
        if (nickname) user.nickname = nickname;
        await user.save();

        // 调用生成token的服务
        return this.tokenService.generateAccessToken(user.id);
    }

    // 使用用户名密码注册用户
    async login(data: any) {
        const { credential, password } = data;
        const user = await this.userService.findOneByCredential(credential);

        if (user && decrypt(password, user.password)) {
            return this.tokenService.generateAccessToken(user.id);
        }

        throw new UnauthorizedException('用户登录失败');
    }

    // 使用账号密码登录
    async validateUser(credential: string, password: string) {
        const user = await this.userService.findOneByCredential(credential);

        if (user && decrypt(password, user.password)) {
            return user;
        }
        return false;
    }

    async createToken(id: string) {
        return this.tokenService.generateAccessToken(id);
    }
}
