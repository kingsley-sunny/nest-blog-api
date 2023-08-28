import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { ILike } from '../../database/models/like';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  @Inject(LikeRepository)
  likeRepository: LikeRepository;

  async create(data: CreateLikeDto, userId: number) {
    Logger.log('create', 'LikeService');

    let like: ILike;
    try {
      const { post_id } = data;

      like = await this.likeRepository.findOne({ post_id, user_id: userId });

      if (like) {
        return like;
      }

      like = await this.likeRepository.create({
        post_id,
        user_id: userId,
      });
    } catch (error) {
      Logger.log(error.message, 'LikeService');

      throw new InternalServerErrorException(error.message);
    }

    return like;
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'LikeService');

    try {
      const likes = await this.likeRepository.find({}, params);

      return likes;
    } catch (error) {
      Logger.log(error.message, 'LikeService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<ILike>) {
    Logger.log('findOne', 'LikeService');

    const like = await this.likeRepository.findOne(params);

    return like;
  }

  async findById(id: number) {
    Logger.log('findById', 'LikeService');

    const like = await this.likeRepository.findById(id);
    if (!like) {
      throw new NotFoundException('Like not found');
    }

    return like;
  }

  async delete(id: number) {
    Logger.log('delete', 'LikeService');

    try {
      return await this.likeRepository.delete(id);
    } catch (error) {
      Logger.error(error.message, 'LikeService');

      throw new InternalServerErrorException(error.message);
    }
  }
}
