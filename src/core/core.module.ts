import { DynamicModule, ModuleMetadata, Provider, Type } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, ObjectType } from 'typeorm';

import { AppFilter, AppIntercepter, AppPipe } from './app';
import { TransformInterceptor } from './app/transform.interceptor';

import { CUSTOM_REPOSITORY_METADATA } from './constants';
import { CoreOptions } from './types';

export class CoreModule {
    /**
     * 注册Core模块
     * @param options
     */
    public static forRoot(options: CoreOptions = {}): DynamicModule {
        const imports: ModuleMetadata['imports'] = [];
        if (options.database) imports.push(TypeOrmModule.forRoot(options.database));
        const providers: ModuleMetadata['providers'] = [
            {
                provide: APP_PIPE,
                useFactory: () =>
                    new AppPipe({
                        transform: true,
                        forbidUnknownValues: false,
                        validationError: { target: false },
                    }),
            },

            {
                provide: APP_INTERCEPTOR,
                useClass: AppIntercepter,
            },
            {
                provide: APP_INTERCEPTOR, // 数据转换拦截器
                useClass: TransformInterceptor,
            },
            {
                provide: APP_FILTER,
                useClass: AppFilter,
            },
        ];
        return {
            global: true,
            imports,
            providers,
            module: CoreModule,
        };
    }

    /**
     * @description 注册自定义Repository
     * @static
     * @template T
     * @param {T[]} repositories 需要注册的自定义类列表
     * @param {string} [dataSourceName] 数据池名称,默认为默认连接
     */
    public static forRepository<T extends Type<any>>(
        repositories: T[],
        dataSourceName?: string,
    ): DynamicModule {
        const providers: Provider[] = [];

        for (const Repo of repositories) {
            const entity = Reflect.getMetadata(CUSTOM_REPOSITORY_METADATA, Repo);

            if (!entity) {
                continue;
            }

            providers.push({
                inject: [getDataSourceToken(dataSourceName)],
                provide: Repo,
                useFactory: (dataSource: DataSource): typeof Repo => {
                    const base = dataSource.getRepository<ObjectType<any>>(entity);
                    return new Repo(base.target, base.manager, base.queryRunner);
                },
            });
        }

        return {
            exports: providers,
            module: CoreModule,
            providers,
        };
    }
}
