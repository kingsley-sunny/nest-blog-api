import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DATABASE_TABLES } from '../../database';
import { FetchQuery } from '../../database/base/base.interface';
import { IComment } from '../../database/models/comment';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  @Inject(CommentRepository)
  commentRepository: CommentRepository;

  async create(data: CreateCommentDto, userId: number) {
    Logger.log('create', 'CommentService');

    let comment: IComment;
    try {
      const { post_id, text } = data;

      comment = await this.commentRepository.create({
        text,
        post_id,
        user_id: userId,
      });
    } catch (error) {
      Logger.log(error.message, 'CommentService');

      throw new InternalServerErrorException(error.message);
    }

    return comment;
  }

  async find(params: FetchQuery, postId?: number) {
    Logger.log('find', 'CommentService');
    let comments: any;
    try {
      if (postId) {
        comments = await this.commentRepository
          .findSync({ post_id: postId }, params)
          .select(
            `${DATABASE_TABLES.comments}.*`,
            this.commentRepository.model
              .relatedQuery('likes')
              .count()
              .as('likes'),
          );
      } else {
        comments = await this.commentRepository
          .findSync({}, params)
          .select(
            `${DATABASE_TABLES.comments}.*`,
            this.commentRepository.model
              .relatedQuery('likes')
              .count()
              .as('likes'),
          );
      }

      const paginatedComments = await this.commentRepository.paginateData(
        comments,
        params.limit,
        params.page,
      );

      return paginatedComments;
    } catch (error) {
      Logger.log(error.message, 'CommentService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IComment>) {
    Logger.log('findOne', 'CommentService');

    const comment = await this.commentRepository.findOne(params);

    return comment;
  }

  async findPostComments(params: FetchQuery, postId: number) {
    Logger.log('findPostComments', 'CommentService');

    try {
      const comments = await this.commentRepository.find(
        { post_id: postId },
        params,
      );

      return comments;
    } catch (error) {
      Logger.log(error.message, 'CommentService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: number) {
    Logger.log('findById', 'CommentService');

    const comment = await this.commentRepository.findById(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(id: number, data: UpdateCommentDto, userId: number) {
    Logger.log('update', 'CommentService');

    let comment = await this.commentRepository.findOne({ id, user_id: userId });

    if (!comment) {
      throw new NotFoundException('Comment Not found');
    }

    try {
      comment = await this.commentRepository.update(id, data);

      return comment;
    } catch (error) {
      Logger.error(error.message, 'CommentService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number) {
    Logger.log('delete', 'CommentService');

    try {
      return await this.commentRepository.delete(id);
    } catch (error) {
      Logger.error(error.message, 'CommentService');

      throw new InternalServerErrorException(error.message);
    }
  }
}
