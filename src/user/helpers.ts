import bcrypt from 'bcrypt';

import { userConfig } from '@/config';

// 生成随机验证码
export function generateCatpchaCode() {
    return Math.random().toFixed(6).slice(-6);
}

// 加密明文密码
export const encrypt = (password: string) => {
    return bcrypt.hashSync(password, userConfig().hash);
};

// 验证密码
export const decrypt = (password: string, hashed: string) => {
    return bcrypt.compareSync(password, hashed);
};
