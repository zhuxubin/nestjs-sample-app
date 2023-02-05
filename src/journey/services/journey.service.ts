import { Injectable, NotFoundException } from '@nestjs/common';
import { isArray, omit } from 'lodash';
import { In } from 'typeorm';

import { CreateJourneyDto, QueryJourneyDto, UpdateJourneyDto } from '../dtos';
import { JourneyRepository, TagRepository } from '../repositories';

@Injectable()
export class JourneyService {
    constructor(
        protected journeyRepository: JourneyRepository,
        protected tagRepository: TagRepository,
    ) {}

    async list(data: QueryJourneyDto) {
        const { page, pageSize } = data;
        return this.journeyRepository
            .buildBaseQuery()
            .leftJoinAndSelect('journey.tags', 'tags')
            .skip(pageSize * (page - 1))
            .take(pageSize)
            .getMany();
    }

    async create(userId: string, data: CreateJourneyDto) {
        // 分类
        const tags = isArray(data.tags)
            ? await this.tagRepository.findBy({
                  id: In(data.tags),
              })
            : [];
        const createJourney = {
            ...data,
            userId,
            tags,
        };
        const item = await this.journeyRepository.save(createJourney);
        return this.detail(item.id);
    }

    async update(data: UpdateJourneyDto) {
        await this.journeyRepository.update(data.id, omit(data, ['id', 'tags']));
        return this.detail(data.id);
    }

    async detail(id: string) {
        const item = await this.journeyRepository
            .buildBaseQuery()
            .leftJoinAndSelect('journey.tags', 'tags')
            .where('journey.id = :id', { id })
            .getOne();
        if (!item) throw new NotFoundException(`行程${id}不存在`);
        return item;
    }

    async delete(id: string) {
        return this.journeyRepository.softDelete(id);
    }
}
