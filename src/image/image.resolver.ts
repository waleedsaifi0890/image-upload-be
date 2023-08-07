import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FileUpload } from 'graphql-upload';
import { ImageUploadService } from 'src/common/uploader/services/uploadImage.service';

@Resolver(() => Image)
export class ImageResolver {
  constructor(
    private readonly imageService: ImageService,
    private readonly imageUploadService: ImageUploadService,
  ) {}

  @Mutation(() => Image)
  async createImage(
    @Args('createImageInput') createImageInput: CreateImageInput,
  ) {
    if (createImageInput.image) {
      const url = await this.imageUploadService.uploadFile(
        await createImageInput.image,
      );
      createImageInput = {
        ...createImageInput,
        image: url.Location as FileUpload,
      };
    }
    return this.imageService.create(createImageInput);
  }

  @Query(() => [Image], { name: 'images' })
  findAll() {
    return this.imageService.findAll();
  }

  @Query(() => Image, { name: 'image' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.imageService.findOne(id);
  }

  @Mutation(() => Image)
  updateImage(@Args('updateImageInput') updateImageInput: UpdateImageInput) {
    return this.imageService.update(updateImageInput.id, updateImageInput);
  }

  @Mutation(() => Image)
  removeImage(@Args('id', { type: () => Int }) id: number) {
    return this.imageService.remove(id);
  }
}
