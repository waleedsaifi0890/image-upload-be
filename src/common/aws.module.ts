import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageUploadService } from './uploader/services/uploadImage.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class AwsModule {}
