// Jwt 荷载
export interface JwtPayload {
    sub: string; // 用户ID
}

/**
 * 自定义用户模块配置
 */
export interface UserConfig {
    hash?: number;
    jwt: JwtConfig;
}

/**
 * JWT配置
 */
export interface JwtConfig {
    secret: string;
    token_expired: number;
}
