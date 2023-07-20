import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseService } from './base/base.service';

@Controller()
export class AppController {
  @Inject(BaseService)
  private baseService: BaseService;
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  getNack(@Param('id', ParseIntPipe) id: number): any {
    return this.baseService.transformResponse(
      { name: this.appService.getHello() + 'Hi it is working' },
      'Successful',
    );
  }
}
