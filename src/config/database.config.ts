import { TypeOrmModuleOptions } from '@nestjs/typeorm';
/**
 * 数据库配置函数
 */
export const database: () => TypeOrmModuleOptions = () => ({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'app',
    entities: [],
    // 自动加载模块中注册的entity
    autoLoadEntities: true,
    // 可以在webpack热更新时保持连接,目前用不到
    keepConnectionAlive: true,
    // 可以在开发环境下同步entity的数据结构到数据库
    synchronize: process.env.NODE_ENV !== 'production',
});
