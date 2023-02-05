import { Injectable } from '@nestjs/common';

import { TagRepository } from '../repositories';

// token服务
@Injectable()
export class TagService {
    constructor(protected tagRepository: TagRepository) {}

    async list() {
        return this.tagRepository.find();
    }
}
