/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.comments);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.comments);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.comments,
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
        .bigint('post_id')
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.posts)
        .onDelete('CASCADE');

      tableBuilder
        .bigint('recipient_id')
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.users)
        .onDelete('CASCADE');

      tableBuilder.string('text').notNullable();

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.comments);
}
