import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// 核心模块配置信息
export interface CoreOptions {
    database?: TypeOrmModuleOptions;
}

// 类转义为普通对象后的类型
export type ClassToPlain<T> = { [key in keyof T]: T[key] };
