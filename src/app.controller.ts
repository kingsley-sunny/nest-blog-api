import { Controller, Get } from '@nestjs/common';
import { BaseService } from './base';

// Person model.

@Controller()
export class AppController {
  @Get('/')
  async find() {
    return BaseService.transformResponse(
      { text: 'This is working' },
      'this is fucking working',
    );
  }

  @Get('/socket')
  async socket() {
    return await BaseService.transformResponse(
      { name: 'this is fucking' },
      'this is funckin',
    );
  }
}
