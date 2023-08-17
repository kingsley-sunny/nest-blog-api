/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.users);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.users);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.users,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.string('full_name', 129).notNullable();
      tableBuilder.string('user_name', 256).notNullable();
      tableBuilder.string('email').notNullable();
      tableBuilder.string('password').notNullable();

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.users);
}
