import { Repository } from 'typeorm';

import { CustomRepository } from '@/core/decorators';

import { MemoEntity } from '../entities';

@CustomRepository(MemoEntity)
export class MemoRepository extends Repository<MemoEntity> {
    private tableName = 'memo'; // 表名

    buildBaseQuery() {
        return this.createQueryBuilder(this.tableName).orderBy(
            `${this.tableName}.createdAt`,
            'DESC',
        );
    }
}
