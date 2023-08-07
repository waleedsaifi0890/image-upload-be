import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql.module';
import { ConfigModule } from './config.module';
import { AwsModule } from './aws.module';
@Module({
  imports: [ConfigModule, GraphqlModule, AwsModule],
  exports: [ConfigModule, GraphqlModule, AwsModule],
})
export class CommonModule {}
