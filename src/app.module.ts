import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { database } from './config';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [CoreModule.forRoot({ database: database() }), UserModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
