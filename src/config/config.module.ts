import { Module } from '@nestjs/common';
import { EnvironmentModule, EnvironmentService } from './environment';
@Module({
  imports: [EnvironmentModule],
  providers: [EnvironmentService],
})
export class ConfigModule {}
