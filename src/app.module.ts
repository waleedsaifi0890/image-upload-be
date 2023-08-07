import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from './image/image.module';
import { CommonModule } from './common/common.module';
import { Comment } from './comments/entities/comment.entity';
import { CommentsModule } from './comments/comments.module';
import { Image } from './image/entities/image.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DBUSERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [Image, Comment],
      synchronize: true,
    }),
    CommonModule,
    ImageModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
