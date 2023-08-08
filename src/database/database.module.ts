import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { Model } from 'objection';
import KnexConfig from '../../knexfile';

// Initialize knex.
export const knex = Knex(KnexConfig);
console.log('🚀 ~~ file: database.module.ts:16 ~~ knex:', Model.knex(knex));

@Global()
@Module({
  imports: [],
  providers: [
    {
      useFactory: () => {
        // Give Instance of knex to the Objection
        Model.knex(knex);

        return knex;
      },
      provide: 'DatabaseService',
    },
  ],
})
export class DatabaseModule {}
