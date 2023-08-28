import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IReplyLike } from '../../database/models/replyLIke';
import { CreateReplyLikeDto } from './dto/create-reply-like.dto';
import { ReplyLikeRepository } from './reply-like.repository';

@Injectable()
export class ReplyLikeService {
  @Inject(ReplyLikeRepository)
  replyLikeRepository: ReplyLikeRepository;

  async create(data: CreateReplyLikeDto, userId: number) {
    Logger.log('create', 'ReplyLikeService');

    let replyLike: IReplyLike;
    try {
      const { reply_id } = data;

      replyLike = await this.replyLikeRepository.findOne({
        user_id: userId,
      });

      if (replyLike) {
        return replyLike;
      }

      replyLike = await this.replyLikeRepository.create({
        reply_id,
        user_id: userId,
      });
    } catch (error) {
      Logger.log(error.message, 'ReplyLikeService');

      throw new InternalServerErrorException(error.message);
    }

    return replyLike;
  }

  async find(params: FetchQuery, replyId?: number) {
    Logger.log('find', 'ReplyLikeService');
    let replyLikes: any;
    try {
      if (replyId) {
        replyLikes = await this.replyLikeRepository.find(
          { reply_id: replyId },
          params,
        );
      } else {
        replyLikes = await this.replyLikeRepository.find({}, params);
      }

      return replyLikes;
    } catch (error) {
      Logger.log(error.message, 'ReplyLikeService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IReplyLike>) {
    Logger.log('findOne', 'ReplyLikeService');

    const replyLike = await this.replyLikeRepository.findOne(params);

    return replyLike;
  }

  async findById(id: number) {
    Logger.log('findById', 'ReplyLikeService');

    const replyLike = await this.replyLikeRepository.findById(id);
    if (!replyLike) {
      throw new NotFoundException('ReplyLike not found');
    }

    return replyLike;
  }

  async update(id: number, data: CreateReplyLikeDto, userId: number) {
    Logger.log('update', 'ReplyLikeService');

    let replyLike = await this.replyLikeRepository.findOne({
      id,
      user_id: userId,
    });

    if (!replyLike) {
      throw new NotFoundException('ReplyLike Not found');
    }

    try {
      replyLike = await this.replyLikeRepository.update(id, data);

      return replyLike;
    } catch (error) {
      Logger.error(error.message, 'ReplyLikeService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number) {
    Logger.log('delete', 'ReplyLikeService');

    try {
      return await this.replyLikeRepository.delete(id);
    } catch (error) {
      Logger.error(error.message, 'ReplyLikeService');

      throw new InternalServerErrorException(error.message);
    }
  }
}
