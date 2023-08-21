/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(
    DATABASE_TABLES.reset_password_codes,
  );

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.reset_password_codes);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.reset_password_codes,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder
        .uuid('unique_id')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.string('email').notNullable();
      tableBuilder.boolean('is_used').notNullable().defaultTo(false);
      tableBuilder.timestamp('expires_at');

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.reset_password_codes);
}
