/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.user_roles);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.user_roles);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.user_roles,
    (tableBuilder) => {
      tableBuilder.increments('id').primary();
      tableBuilder.uuid('uuid').notNullable();

      tableBuilder
        .bigint('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(DATABASE_TABLES.users);

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.roles);
}
