import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageResolver } from './image.resolver';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageUploadService } from 'src/common/uploader/services/uploadImage.service';
import { Comment } from 'src/comments/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, Comment]), ImageModule],
  providers: [ImageResolver, ImageService, ImageUploadService],
  exports: [ImageService],
})
export class ImageModule {}
