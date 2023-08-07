import { ObjectType, Field, InputType } from '@nestjs/graphql';
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
}
