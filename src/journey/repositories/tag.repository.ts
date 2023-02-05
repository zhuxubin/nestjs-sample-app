import { Repository } from 'typeorm';

import { CustomRepository } from '@/core/decorators';

import { TagEntity } from '../entities';

@CustomRepository(TagEntity)
export class TagRepository extends Repository<TagEntity> {
    private tableName = 'tag'; // 表名

    buildBaseQuery() {
        return this.createQueryBuilder(this.tableName).orderBy(
            `${this.tableName}.createdAt`,
            'DESC',
        );
    }
}
