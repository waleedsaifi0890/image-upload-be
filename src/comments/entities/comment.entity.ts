import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Image } from 'src/image/entities/image.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @ManyToOne(() => Image, (comment: Image) => comment, {
    nullable: true,
  })
  @Field(() => Image, { nullable: true })
  image: Image;

  @Column({ nullable: true, default: null })
  @Field()
  comment: string;
}
