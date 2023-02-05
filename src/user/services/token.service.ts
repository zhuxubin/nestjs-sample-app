import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from '../types';

// token服务
@Injectable()
export class TokenService {
    constructor(protected readonly jwtService: JwtService) {}

    async generateAccessToken(userID: string) {
        const accessTokenPayload: JwtPayload = {
            sub: userID,
        };
        return {
            access_token: this.jwtService.sign(accessTokenPayload),
        };
    }
}
