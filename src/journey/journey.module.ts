import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoreModule } from '@/core/core.module';

import * as controllers from './controllers';
import * as dtos from './dtos';
import * as entities from './entities';
import * as repositories from './repositories';
import * as services from './services';

@Module({
    imports: [
        TypeOrmModule.forFeature(Object.values(entities)),
        CoreModule.forRepository(Object.values(repositories)),
    ],
    controllers: [...Object.values(controllers)],
    providers: [...Object.values(services), ...Object.values(dtos)], // 这里注意不要将 repositories 放进去了
    exports: [...Object.values(services), CoreModule.forRepository(Object.values(repositories))],
})
export class JourneyModule {}
