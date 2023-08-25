import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function seed(knex: Knex): Promise<void> {
  await knex(DATABASE_TABLES.roles).delete();

  await knex(DATABASE_TABLES.roles).insert([
    { id: 1, title: 'OWNER', uuid: 'a4a21ed0-e0a0-4fec-a580-1bcab270de05' },
    { id: 2, title: 'ADMIN', uuid: '53db78db-3f37-476a-bcb6-d833ddaa9e96' },
    { id: 3, title: 'USER', uuid: 'b4c1b534-7c50-4642-b08c-0694e5f7f5c6' },
  ]);
}
