import { Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';

import { MemoDto, ListMemoDto, UpdateMemoDto } from '../dtos';

import { MemoRepository } from '../repositories';

@Injectable()
export class MemoService {
    constructor(private memoRepository: MemoRepository) {}

    async list(userId: string, data: ListMemoDto) {
        const { page, pageSize } = data;
        return this.memoRepository
            .buildBaseQuery()
            .skip(pageSize * (page - 1))
            .take(pageSize)
            .getMany();
    }

    async detail(id: string) {
        const item = await this.memoRepository.findOne({
            where: { id },
        });
        if (!item) {
            throw new NotFoundException(`数据${id}不存在`);
        }
        return item;
    }

    async create(userId: string, data: MemoDto) {
        const createMemo = {
            ...data,
            userId,
        };
        const item = await this.memoRepository.save(createMemo);
        return this.detail(item.id);
    }

    async update(data: UpdateMemoDto) {
        await this.memoRepository.update(data.id, omit(data, ['id']));
        return this.detail(data.id);
    }

    async delete(id: string) {
        return this.memoRepository.softDelete(id);
    }
}
