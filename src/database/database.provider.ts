import { Logger, Provider } from '@nestjs/common';
import Knex from 'knex';
import { Model } from 'objection';
import KnexConfig from '../../knexfile';

export const knex = Knex(KnexConfig);

export const DatabaseProvider: Provider = {
  useFactory: () => {
    Logger.log('initializing Knex', 'DatabaseModule');

    // Give Instance of knex to the Objection
    Model.knex(knex);

    console.log('Successfully Created connection with the database');

    return knex;
  },
  provide: Symbol.for('KnexConfig'),
};
