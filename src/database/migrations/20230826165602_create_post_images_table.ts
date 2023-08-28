/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.post_images);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.post_images);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.post_images,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder
        .bigint('post_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.posts)
        .onDelete('CASCADE');

      tableBuilder.string('public_id').notNullable();

      tableBuilder.string('url').notNullable();

      tableBuilder.string('blurhash').nullable();

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.post_images);
}
