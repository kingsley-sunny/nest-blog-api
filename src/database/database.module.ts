import { Global, Injectable, Module } from '@nestjs/common';
import Knex from 'knex';
import { Model } from 'objection';

// Initialize knex.
const knex = Knex({
  client: 'mysql2',
  useNullAsDefault: true,
  connection: {
    filename: 'example.db',
    database: 'mysql',
    userName: 'root',
    password: 'bosslikeme',
  },
});

@Injectable()
export class DatabaseService extends Model {
  constructor() {
    super();
  }
}

@Global()
@Module({
  imports: [],
  providers: [
    {
      useFactory: () => {
        return Model.knex(knex);
      },
      provide: 'DatabaseService',
    },
  ],
  exports: [
    {
      useFactory: () => {
        return Model.knex(knex);
      },
      provide: 'DatabaseService',
    },
  ],
})
export class DatabaseModule {}
