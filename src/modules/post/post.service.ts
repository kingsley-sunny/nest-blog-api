import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IPost } from '../../database/models/post';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  @Inject(PostRepository)
  postRepository: PostRepository;

  async create(data: CreatePostDto, userId: number) {
    Logger.log('create', 'PostService');

    let post: IPost;
    try {
      const { title, category_id, content, description } = data;

      post = await this.postRepository.create({
        title,
        category_id,
        content,
        description,
        user_id: userId,
      });
    } catch (error) {
      Logger.log(error.message, 'PostService');

      throw new InternalServerErrorException(error.message);
    }

    return post;
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'PostService');

    try {
      const posts = await this.postRepository.find({}, params, '[likes]', {
        relationship: 'likes',
        modifier(builder) {
          builder.count('id', { as: 'total' });
        },
      });

      this.postRepository.model.query().count('*');

      return posts;
    } catch (error) {
      Logger.log(error.message, 'PostService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IPost>) {
    Logger.log('findOne', 'PostService');

    const post = await this.postRepository.findOne(params);

    return post;
  }

  async findById(id: number) {
    Logger.log('findById', 'PostService');

    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: number, data: UpdatePostDto, userId: number) {
    Logger.log('update', 'PostService');

    let post = await this.postRepository.findOne({ id, user_id: userId });

    if (!post) {
      throw new NotFoundException('Post Not found');
    }

    try {
      post = await this.postRepository.update(id, data);

      return post;
    } catch (error) {
      Logger.error(error.message, 'PostService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number) {
    Logger.log('delete', 'PostService');

    try {
      return await this.postRepository.delete(id);
    } catch (error) {
      Logger.error(error.message, 'PostService');

      throw new InternalServerErrorException(error.message);
    }
  }
}
