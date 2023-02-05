import { Injectable } from '@nestjs/common';

import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    // 根据用户用户凭证查询用户
    async findOneByCredential(credential: string) {
        const query = this.userRepository.buildBaseQuery();
        return query
            .where('users.username = :credential', { credential })
            .orWhere('users.email = :credential', { credential })
            .orWhere('users.email = :credential', { credential })
            .getOne();
    }
}
