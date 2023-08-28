import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { ICommentLike } from '../../database/models/commentLike';
import { CommentLikeRepository } from './comment-like.repository';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';

@Injectable()
export class CommentLikeService {
  @Inject(CommentLikeRepository)
  commentLikeRepository: CommentLikeRepository;

  async create(data: CreateCommentLikeDto, userId: number) {
    Logger.log('create', 'CommentLikeService');

    let commentLike: ICommentLike;
    try {
      const { comment_id } = data;

      commentLike = await this.commentLikeRepository.findOne({
        user_id: userId,
      });

      if (commentLike) {
        return commentLike;
      }

      commentLike = await this.commentLikeRepository.create({
        comment_id,
        user_id: userId,
      });
    } catch (error) {
      Logger.log(error.message, 'CommentLikeService');

      throw new InternalServerErrorException(error.message);
    }

    return commentLike;
  }

  async find(params: FetchQuery, commentId?: number) {
    Logger.log('find', 'CommentLikeService');
    let commentLikes: any;
    try {
      if (commentId) {
        commentLikes = await this.commentLikeRepository.find(
          { comment_id: commentId },
          params,
        );
      } else {
        commentLikes = await this.commentLikeRepository.find({}, params);
      }

      return commentLikes;
    } catch (error) {
      Logger.log(error.message, 'CommentLikeService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<ICommentLike>) {
    Logger.log('findOne', 'CommentLikeService');

    const commentLike = await this.commentLikeRepository.findOne(params);

    return commentLike;
  }

  async findById(id: number) {
    Logger.log('findById', 'CommentLikeService');

    const commentLike = await this.commentLikeRepository.findById(id);
    if (!commentLike) {
      throw new NotFoundException('CommentLike not found');
    }

    return commentLike;
  }

  async update(id: number, data: CreateCommentLikeDto, userId: number) {
    Logger.log('update', 'CommentLikeService');

    let commentLike = await this.commentLikeRepository.findOne({
      id,
      user_id: userId,
    });

    if (!commentLike) {
      throw new NotFoundException('CommentLike Not found');
    }

    try {
      commentLike = await this.commentLikeRepository.update(id, data);

      return commentLike;
    } catch (error) {
      Logger.error(error.message, 'CommentLikeService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number) {
    Logger.log('delete', 'CommentLikeService');

    try {
      return await this.commentLikeRepository.delete(id);
    } catch (error) {
      Logger.error(error.message, 'CommentLikeService');

      throw new InternalServerErrorException(error.message);
    }
  }
}
