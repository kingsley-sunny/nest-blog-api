import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(DATABASE_TABLES.categories).delete();

  await knex(DATABASE_TABLES.categories).insert([
    { id: 1, name: 'Politics' },
    { id: 2, name: 'Entertainment' },
    { id: 3, name: 'Sports' },
    { id: 4, name: 'Business' },
  ]);
}
