import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Image } from 'src/image/entities/image.entity';

@Module({
  // providers: [CommentsResolver, CommentsService]
  imports: [TypeOrmModule.forFeature([Comment, Image]), CommentsModule],
  providers: [CommentsResolver, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
