import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controllers from './controllers';
import * as dtos from './dtos';
import * as entities from './entities';
import * as repositories from './repositories';
import * as services from './services';

@Module({
    imports: [TypeOrmModule.forFeature(Object.values(entities))],
    controllers: [...Object.values(controllers)],
    providers: [...Object.values(services), ...Object.values(repositories), ...Object.values(dtos)],
    exports: [...Object.values(services)],
})
export class MemoModule {}
