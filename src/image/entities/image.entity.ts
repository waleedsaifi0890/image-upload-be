import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import {
  PrimaryGeneratedColumn,
  OneToOne,
  Entity,
  Column,
  OneToMany,
} from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ nullable: true, default: null })
  @Field({ nullable: true })
  image: string;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.image, {
    nullable: true,
  })
  comments: Comment[];
}
