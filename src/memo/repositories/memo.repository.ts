import { DataSource, Repository } from 'typeorm';

import { CustomRepository } from '@/core/decorators';

import { MemoEntity } from '../entities';

@CustomRepository(MemoEntity)
export class MemoRepository extends Repository<MemoEntity> {
    constructor(protected dataSource: DataSource) {
        super(MemoEntity, dataSource.createEntityManager());
    }

    async listMemo(page: number, pageSize: number) {
        return (
            this.dataSource
                .getRepository(MemoEntity)
                .createQueryBuilder('memo')
                // .leftJoinAndSelect('user.id', 'userId')
                .skip(pageSize * (page - 1))
                .take(pageSize)
                .getMany()
        );
    }
}
