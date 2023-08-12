import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(DATABASE_TABLES.roles).truncate();

  await knex(DATABASE_TABLES.roles).insert([
    { title: 'OWNER' },
    { title: 'ADMIN' },
    { title: 'USER' },
  ]);
}
