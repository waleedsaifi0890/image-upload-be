import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly createCommentModel: Repository<Comment>,
  ) {}
  async create(createCommentInput: CreateCommentInput) {
    const categorySetting = await this.createCommentModel.create(
      createCommentInput as any,
    );
    if (!categorySetting)
      throw new HttpException('Failed to add setting', HttpStatus.NOT_FOUND);
    return await this.createCommentModel.save(categorySetting);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
