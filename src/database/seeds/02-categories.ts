import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(DATABASE_TABLES.categories).delete();

  await knex(DATABASE_TABLES.categories).insert([
    { name: 'Politics' },
    { name: 'Entertainment' },
    { name: 'Sports' },
    { name: 'Business' },
  ]);
}
