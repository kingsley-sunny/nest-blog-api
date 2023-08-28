import { PartialType } from '@nestjs/swagger';
import { CreatePostImageDto } from './create-post-image.dto';

export class UpdatePostImageDto extends PartialType(CreatePostImageDto) {}
