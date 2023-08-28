/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.posts);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.posts);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.posts,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.string('title').notNullable();
      tableBuilder.string('description').notNullable();
      tableBuilder.string('content').notNullable();

      tableBuilder
        .bigint('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.users)
        .onDelete('CASCADE');

      tableBuilder
        .bigint('category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.categories)
        .onDelete('CASCADE');

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.posts);
}
