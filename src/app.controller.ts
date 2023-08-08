import { faker } from '@faker-js/faker';
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BaseService } from './base/base.service';
import { FetchQuery } from './database/base/base.interface';
import { User } from './database/models/user/user.model';
import { UserRepository } from './database/models/user/user.repository';

// Person model.

@Controller()
export class AppController {
  @Inject(BaseService)
  private baseService: BaseService;
  @Inject(UserRepository)
  private userRepository: UserRepository;

  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Query() params: FetchQuery): Promise<any> {
    console.log(
      '🚀 ~~ file: app.controller.ts:22 ~~ AppController ~~ getHello ~~ params:',
      params,
    );

    const user = await this.userRepository.update(3, { user_name: 'Nacking' });

    return this.baseService.transformResponse(user, 'Successful');
  }

  @Get(':id')
  async getNack(@Param('id', ParseIntPipe) id: number): Promise<any> {
    for (let i = 0; i < 30; i++) {
      const user = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };

      await User.query().insert({
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        user_name: user.username,
        password: user.password,
      });
    }

    return this.baseService.transformResponse(
      { name: this.appService.getHello() + 'Hi it is working ' + id },
      'Successful',
    );
  }
}
