import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseService } from './base/base.service';
import { DatabaseService } from './database/database.module';

@Controller()
export class AppController {
  @Inject(BaseService)
  private baseService: BaseService;
  @Inject('DatabaseService')
  private model: DatabaseService;

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    console.log(this.model);

    return this.baseService.transformResponse(
      {
        nack: this.appService.getHello(),
      },
      'Successful',
    );
  }

  @Get(':id')
  getNack(@Param('id', ParseIntPipe) id: number): any {
    console.log(
      '🚀 ~~ file: app.controller.ts:18 ~~ AppController ~~ getNack ~~ id:',
      id,
    );

    return this.baseService.transformResponse(
      { name: this.appService.getHello() + 'Hi it is working ' + id },
      'Successful',
    );
  }
}
