import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FileAdapter } from '../../adapters/file/file.adapter';
import { FetchQuery } from '../../database/base/base.interface';
import { IPostImage } from '../../database/models/postImage';
import { CreatePostImageDto } from './dto/create-post-image.dto';
import { PostImageRepository } from './post-image.repository';

@Injectable()
export class PostImageService {
  @Inject(PostImageRepository)
  postImageRepository: PostImageRepository;
  @Inject(FileAdapter)
  fileAdapter: FileAdapter;

  async create(data: CreatePostImageDto, file: Express.Multer.File) {
    Logger.log('create', 'PostImageService');

    let postImage: IPostImage;
    try {
      const { post_id } = data;

      const uploadedFile = await this.fileAdapter.uploadFile(file);

      postImage = await this.postImageRepository.create({
        url: uploadedFile.url,
        post_id,
        public_id: uploadedFile.public_id,
      });
    } catch (error) {
      Logger.log(error.message, 'PostImageService');

      throw new InternalServerErrorException(error.message);
    }

    return postImage;
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'PostImageService');

    try {
      const postImages = await this.postImageRepository.find({}, params);

      return postImages;
    } catch (error) {
      Logger.log(error.message, 'PostImageService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IPostImage>) {
    Logger.log('findOne', 'PostImageService');

    const postImage = await this.postImageRepository.findOne(params);

    return postImage;
  }

  async findById(id: number) {
    Logger.log('findById', 'PostImageService');

    const postImage = await this.postImageRepository.findById(id);
    if (!postImage) {
      throw new NotFoundException('PostImage not found');
    }

    return postImage;
  }

  async update(id: number, file?: Express.Multer.File) {
    Logger.log('update', 'PostImageService');

    let postImage = await this.postImageRepository.findOne({
      id,
    });

    if (!postImage) {
      throw new NotFoundException('PostImage Not found');
    }

    const uploadedFile = await this.fileAdapter.updateFile(
      postImage.public_id,
      file,
    );

    try {
      postImage = await this.postImageRepository.update(id, {
        url: uploadedFile.url,
        public_id: uploadedFile.public_id,
      });

      return postImage;
    } catch (error) {
      Logger.error(error.message, 'PostImageService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number, publicId: string) {
    Logger.log('delete', 'PostImageService');

    try {
      await this.fileAdapter.deleteFile(publicId);

      return await this.postImageRepository.delete(id);
    } catch (error) {
      Logger.error(error.message, 'PostImageService');

      throw new InternalServerErrorException(error.message);
    }
  }
}
