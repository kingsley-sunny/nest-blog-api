/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.roles);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.roles);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.roles,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.string('title', 12).notNullable();

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.roles);
}
