import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  image: number;

  @IsString()
  @Field()
  comment: string;
}
