import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { userConfig } from '@/config';
import { CoreModule } from '@/core/core.module';

import * as controllers from './controllers';
import * as dtos from './dtos';
import * as entities from './entities';
import * as guards from './guards';
import { JwtAuthGuard } from './guards';
import * as repositories from './repositories';
import * as services from './services';
import * as strategies from './strategies';

@Module({
    imports: [
        TypeOrmModule.forFeature(Object.values(entities)),
        CoreModule.forRepository(Object.values(repositories)),
        JwtModule.registerAsync({
            useFactory: async () => {
                return {
                    secret: userConfig().jwt.secret,
                    signOptions: {
                        expiresIn: userConfig().jwt.token_expired, // 有效期1天
                    },
                };
            },
        }),
    ],
    controllers: [...Object.values(controllers)],
    providers: [
        ...Object.values(dtos),
        ...Object.values(services),
        ...Object.values(strategies),
        ...Object.values(guards),
        {
            provide: APP_GUARD, // 设置全局守卫
            useClass: JwtAuthGuard,
        },
    ],
    exports: [...Object.values(services), CoreModule.forRepository(Object.values(repositories))],
})
export class UserModule {}
