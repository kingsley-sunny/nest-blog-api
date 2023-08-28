/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(
    DATABASE_TABLES.verification_codes,
  );

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.verification_codes);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.verification_codes,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.integer('code', 6).notNullable();
      tableBuilder.string('email').notNullable();
      tableBuilder.timestamp('expires_at');

      tableBuilder
        .bigint('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.users)
        .onDelete('CASCADE');

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.verification_codes);
}
