import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

import { IsMatch, IsMatchPhone, IsPassword, IsUnique, IsUniqueExist } from '@/core/constraints';

import { UserDtoGroups } from '../constants';
import { UserEntity } from '../entities';

// 用户模块DTO的通用基础字段
@Injectable()
export class GuestDto {
    @Length(4, 50, {
        message: '登录凭证长度必须为$constraint1到$constraint2',
        always: true,
    })
    @IsNotEmpty({ message: '登录凭证不得为空', always: true })
    @ApiProperty({ description: '登录凭证(用户名|邮箱|手机号)' })
    readonly credential!: string;

    @IsUnique(
        { entity: UserEntity },
        {
            groups: [UserDtoGroups.REGISTER, UserDtoGroups.CREATE],
            message: '该用户名已被注册',
        },
    )
    @IsUniqueExist(
        { entity: UserEntity, ignore: 'id' },
        {
            groups: [UserDtoGroups.UPDATE, UserDtoGroups.BOUND],
            message: '该用户名已被注册',
        },
    )
    @Length(4, 50, {
        always: true,
        message: '用户名长度必须为$constraint1到$constraint2',
    })
    @IsOptional({ groups: [UserDtoGroups.UPDATE] })
    @ApiProperty({ description: '用户名称' })
    username!: string;

    @Length(3, 20, {
        always: true,
        message: '昵称必须为$constraint1到$constraint2',
    })
    @IsOptional({ always: true })
    @ApiProperty({ description: '昵称' })
    nickname?: string;

    @IsUnique(
        { entity: UserEntity },
        {
            message: '手机号已被注册',
            groups: [UserDtoGroups.CREATE],
        },
    )
    @IsMatchPhone(
        undefined,
        { strictMode: true },
        {
            message: '手机号格式错误,示例: +86.13800138000',
            always: true,
        },
    )
    @IsOptional({ groups: [UserDtoGroups.CREATE, UserDtoGroups.UPDATE] })
    @ApiProperty({ description: '手机号' })
    phone: string;

    @IsUnique(
        { entity: UserEntity },
        {
            message: '邮箱已被注册',
            groups: [UserDtoGroups.CREATE],
        },
    )
    @IsEmail(undefined, {
        message: '邮箱地址格式错误',
        always: true,
    })
    @IsOptional({ groups: [UserDtoGroups.CREATE, UserDtoGroups.UPDATE] })
    @ApiProperty({ description: '邮箱地址' })
    email: string;

    @IsPassword(5, {
        message: '密码必须由小写字母,大写字母,数字以及特殊字符组成',
        always: true,
    })
    @Length(8, 50, {
        message: '密码长度不得少于$constraint1',
        always: true,
    })
    @ApiProperty({ description: '密码' })
    readonly password!: string;

    @IsMatch('password', { message: '两次输入密码不同', always: true })
    @IsNotEmpty({ message: '请再次输入密码以确认', always: true })
    @ApiProperty({ description: '再次输入密码' })
    readonly plainPassword!: string;
}
