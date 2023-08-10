import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { Model } from 'objection';
import KnexConfig from '../../knexfile';

@Global()
@Module({
  imports: [],
  providers: [
    {
      useFactory: () => {
        // Initialize knex.
        const knex = Knex(KnexConfig);
        // Give Instance of knex to the Objection
        Model.knex(knex);

        console.log('Successfully Created connection with the database');

        return knex;
      },
      provide: 'DatabaseService',
    },
  ],
})
export class DatabaseModule {}
