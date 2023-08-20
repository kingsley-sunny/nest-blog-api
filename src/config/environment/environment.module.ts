import { Global, Module } from '@nestjs/common';
import { EnvironmentService } from './environment.service';

@Global()
@Module({
  exports: [EnvironmentService],
  providers: [EnvironmentService],
})
export class EnvironmentModule {}
