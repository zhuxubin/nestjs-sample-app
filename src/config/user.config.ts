import { UserConfig } from '@/user/types';

/**
 * 用户模块配置
 */
export const userConfig: () => UserConfig = () => ({
    hash: 10,
    jwt: {
        secret: 'secretsecretsecretsecretsecretsecretsecret',
        token_expired: 3600 * 24,
    },
});
