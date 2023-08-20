import { Global, Module } from '@nestjs/common';
import { BaseService } from './base.service';

@Global()
@Module({
  exports: [BaseService],
  providers: [BaseService],
})
export class BaseModule {}
