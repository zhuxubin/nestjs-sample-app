import { Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';

import { MemoDto, ListMemoDto, UpdateMemoDto } from '../dtos';
import { MemoEntity } from '../entities';

import { MemoRepository } from '../repositories';

@Injectable()
export class MemoService {
    constructor(private memoRepository: MemoRepository) {}

    async findAll(userId: string, dto: ListMemoDto) {
        const { page, pageSize } = dto;
        return this.memoRepository.listMemo(page, pageSize);
    }

    async findOne(id: string) {
        const item = await this.memoRepository.findOne({
            where: { id },
        });
        if (!item) {
            throw new NotFoundException(`数据${id}不存在`);
        }
        return item;
    }

    async addMemo(userId: string, dto: MemoDto) {
        const data = { title: dto.title, userId } as MemoEntity;
        const item = await this.memoRepository.save(data);
        return this.findOne(item.id);
    }

    async updateMemo(data: UpdateMemoDto) {
        await this.memoRepository.update(data.id, omit(data, ['id']));
        return this.findOne(data.id);
    }

    async delMemo(id: string) {
        return this.memoRepository.softDelete(id);
    }
}
