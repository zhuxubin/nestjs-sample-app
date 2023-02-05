import { SetMetadata } from '@nestjs/common';
import { ObjectType } from 'typeorm';

import { CUSTOM_REPOSITORY_METADATA } from '../constants';

// Repository 装饰器
export const CustomRepository = <T>(entity: ObjectType<T>): ClassDecorator =>
    SetMetadata(CUSTOM_REPOSITORY_METADATA, entity);
