import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyRepository } from './reply.repository';
import { ReplyService } from './reply.service';

@Module({
  controllers: [ReplyController],
  exports: [ReplyService],
  providers: [ReplyService, ReplyRepository],
})
export class ReplyModule {}
