import { Module } from '@nestjs/common';

import { database } from './config';
import { CoreModule } from './core/core.module';
import { JourneyModule } from './journey/journey.module';
import { MemoModule } from './memo/memo.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [CoreModule.forRoot({ database: database() }), UserModule, MemoModule, JourneyModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
