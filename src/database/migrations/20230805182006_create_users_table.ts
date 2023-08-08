/* eslint-disable prettier/prettier */
import { randomUUID } from 'crypto';
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const usersTableExists = await knex.schema.hasTable(DATABASE_TABLES.users);

  if (usersTableExists) {
    await knex.schema.dropTable(DATABASE_TABLES.users);
  }

  return knex.schema.createTable(DATABASE_TABLES.users, (tableBuilder) => {
    tableBuilder.increments('id').primary();
    tableBuilder.uuid('uuid').defaultTo(randomUUID());

    tableBuilder.string('first_name');
    tableBuilder.string('last_name');
    tableBuilder.string('user_name');
    tableBuilder.string('email');
    tableBuilder.string('password');

    tableBuilder.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DATABASE_TABLES.users);
}
