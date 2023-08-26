import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IReply } from '../../database/models/reply';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { ReplyRepository } from './reply.repository';

@Injectable()
export class ReplyService {
  @Inject(ReplyRepository)
  replyRepository: ReplyRepository;

  async create(data: CreateReplyDto, userId: number) {
    Logger.log('create', 'ReplyService');

    let reply: IReply;
    try {
      const { comment_id, text, recipient_id } = data;

      reply = await this.replyRepository.create({
        text,
        comment_id,
        recipient_id,
        user_id: userId,
      });
    } catch (error) {
      Logger.log(error.message, 'ReplyService');

      throw new InternalServerErrorException(error.message);
    }

    return reply;
  }

  async find(params: FetchQuery, commentId?: number) {
    Logger.log('find', 'ReplyService');
    let replies: any;
    try {
      if (commentId) {
        replies = await this.replyRepository
          .findSync({ comment_id: commentId }, params)
          .select(
            `*`,
            this.replyRepository.model
              .relatedQuery('likes')
              .count()
              .as('likes'),
          );
      } else {
        replies = await this.replyRepository
          .findSync({}, params)
          .select(
            `*`,
            this.replyRepository.model
              .relatedQuery('likes')
              .count()
              .as('likes'),
          );
      }

      return replies;
    } catch (error) {
      Logger.log(error.message, 'ReplyService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IReply>) {
    Logger.log('findOne', 'ReplyService');

    const reply = await this.replyRepository.findOne(params);

    return reply;
  }

  async findById(id: number) {
    Logger.log('findById', 'ReplyService');

    const reply = await this.replyRepository.findById(id);
    if (!reply) {
      throw new NotFoundException('Reply not found');
    }

    return reply;
  }

  async update(id: number, data: UpdateReplyDto, userId: number) {
    Logger.log('update', 'ReplyService');

    let reply = await this.replyRepository.findOne({ id, user_id: userId });

    if (!reply) {
      throw new NotFoundException('Reply Not found');
    }

    try {
      reply = await this.replyRepository.update(id, data);

      return reply;
    } catch (error) {
      Logger.error(error.message, 'ReplyService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number) {
    Logger.log('delete', 'ReplyService');

    try {
      return await this.replyRepository.delete(id);
    } catch (error) {
      Logger.error(error.message, 'ReplyService');

      throw new InternalServerErrorException(error.message);
    }
  }
}
