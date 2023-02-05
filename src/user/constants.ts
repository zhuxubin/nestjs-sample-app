// 用户请求DTO验证组
export enum UserDtoGroups {
    REGISTER = 'user-register',
    CREATE = 'user-create',
    UPDATE = 'user-update',
    BOUND = 'account-bound',

    PHONE_LOGIN = 'phone-login', // 发送短信登录验证码
    EMAIL_LOGIN = 'email-login', // 发送邮件登录验证码
    PHONE_REGISTER = 'phone-register', // 发送短信注册验证码
    EMAIL_REGISTER = 'email-register', // 发送邮件注册验证码
}
