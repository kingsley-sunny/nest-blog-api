/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.roles);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.roles);
  }

  return await knex.schema.createTableIfNotExists(
    DATABASE_TABLES.roles,
    (tableBuilder) => {
      tableBuilder.increments('id').primary();
      tableBuilder.uuid('uuid').notNullable();

      tableBuilder.string('title', 12).notNullable();

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.roles);
}