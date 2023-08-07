import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageModel: Repository<Image>,
  ) {}
  create(createImageInput: CreateImageInput) {
    const image = this.imageModel.save(createImageInput as any);

    return image;
  }

  async findAll() {
    const allImages = await this.imageModel.find({
      order: { id: 'DESC' },
      relations: ['comments'],
    });
    if (allImages.length < 1) {
      throw new NotFoundException('No images found');
    }
    return allImages;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageInput: UpdateImageInput) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
