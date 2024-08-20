import KnexConfig from '../../knexfile';
import { knex } from './database.provider';

export class SetUpMigrationsAndSeeds {
  public static readonly setupMigrations = () => {
    return knex.migrate.latest(KnexConfig.migrations);
  };

  public static readonly setupSeeds = () => {
    return knex.seed.run(KnexConfig.seeds);
  };
}

(async () => {
  try {
    await SetUpMigrationsAndSeeds.setupMigrations();
    await SetUpMigrationsAndSeeds.setupSeeds();
  } catch (error) {
    console.log('error', error);
  }

  process.exit();
})();
