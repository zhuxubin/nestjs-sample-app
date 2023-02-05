import { Exclude, Expose, Type } from 'class-transformer';
import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * 用户模型
 */
@Exclude()
@Entity('users')
export class UserEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Expose()
    @Column({
        comment: '昵称',
    })
    nickname?: string;

    @Expose()
    @Column({ comment: '用户名', unique: true })
    username!: string;

    @Column({ comment: '密码', length: 500 })
    password!: string;

    @Expose()
    @Column({ comment: '邮箱', nullable: true, unique: true })
    email?: string;

    @Expose()
    @Column({ comment: '手机号', nullable: true, unique: true })
    phone: string;

    @Expose()
    @Type(() => Date)
    @CreateDateColumn({
        comment: '用户创建时间',
    })
    createdAt!: Date;

    @Type(() => Date)
    @DeleteDateColumn({
        comment: '删除时间',
    })
    deletedAt!: Date;

    @BeforeInsert()
    updateDates() {
        if (!this.nickname) {
            this.nickname = ' new Date()';
        }
    }
}
