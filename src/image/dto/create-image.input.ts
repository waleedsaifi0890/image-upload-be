import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@InputType()
export class CreateImageInput {
  @IsString()
  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  image?: Promise<FileUpload>;
}
