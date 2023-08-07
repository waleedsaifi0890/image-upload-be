import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
