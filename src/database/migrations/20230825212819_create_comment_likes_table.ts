/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(
    DATABASE_TABLES.comment_likes,
  );

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.comment_likes);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.comment_likes,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder
        .bigint('user_id')
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.users)
        .onDelete('CASCADE');

      tableBuilder
        .bigint('comment_id')
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.comments)
        .onDelete('CASCADE');

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.comment_likes);
}