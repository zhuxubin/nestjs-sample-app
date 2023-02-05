import { Repository } from 'typeorm';

import { CustomRepository } from '@/core/decorators';

import { JourneyEntity } from '../entities';

@CustomRepository(JourneyEntity)
export class JourneyRepository extends Repository<JourneyEntity> {
    private tableName = 'journey'; // 表名

    buildBaseQuery() {
        return this.createQueryBuilder(this.tableName).orderBy(
            `${this.tableName}.createdAt`,
            'DESC',
        );
    }
}
