import { Exclude, Expose, Type } from 'class-transformer';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    DeleteDateColumn,
} from 'typeorm';

@Exclude()
@Entity('memo')
export class MemoEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Expose()
    @Column()
    title: string;

    @Column()
    userId: string;

    @Type(() => Date)
    @CreateDateColumn({
        comment: '创建时间',
    })
    createdAt: Date;

    @Column({ comment: '完成状态', default: false })
    @Expose()
    completed: boolean;

    @Type(() => Date)
    @UpdateDateColumn({
        comment: '更新时间',
    })
    updatedAt: Date;

    @Type(() => Date)
    @DeleteDateColumn({
        comment: '删除时间',
    })
    deletedAt: Date;
}
