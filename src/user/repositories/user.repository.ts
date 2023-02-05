import { Repository } from 'typeorm';

import { CustomRepository } from '@/core/decorators';

import { UserEntity } from '../entities';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
    private tableName = 'users'; // 表名

    buildBaseQuery() {
        return this.createQueryBuilder(this.tableName).orderBy(
            `${this.tableName}.createdAt`,
            'DESC',
        );
    }
}
