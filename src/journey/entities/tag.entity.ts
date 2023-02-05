import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToMany } from 'typeorm';

import { JourneyEntity } from './journey.entity';

@Exclude()
@Entity('tags')
export class TagEntity extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ description: 'ID' })
    id: string;

    @Expose()
    @Column({ comment: '标签名称' })
    @ApiProperty({ description: '标签名称' })
    name!: string;

    @ManyToMany((type) => JourneyEntity, (journey) => journey.tags)
    journey: JourneyEntity[];
}
