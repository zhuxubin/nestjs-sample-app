import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';

import { TagEntity } from './tag.entity';

@Exclude()
@Entity('journey')
export class JourneyEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'ID' })
    id: string;

    @Expose()
    @Column({ comment: '标题' })
    @ApiProperty({ description: '标题' })
    title!: string;

    @Expose({ groups: ['journey-detail'] })
    @Column({ comment: '内容', type: 'longtext' })
    @ApiProperty({ description: '内容' })
    content!: string;

    @Column({ comment: '用户的ID' })
    userId: string;

    @Expose()
    @Type(() => TagEntity)
    @ManyToMany(() => TagEntity, (tag) => tag.journey, {
        cascade: true,
    })
    @JoinTable({ name: 'journey_tag' })
    @ApiProperty({ description: '标签' })
    tags: TagEntity[];

    @Type(() => Date)
    @CreateDateColumn({
        comment: '创建时间',
    })
    @ApiProperty({ description: '创建日期' })
    createdAt: Date;

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
